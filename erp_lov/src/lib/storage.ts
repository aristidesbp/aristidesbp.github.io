import { supabase, isOnline } from './supabase';
import {
  idbGetAll,
  idbPutMany,
  idbPut,
  idbDeleteMany,
  outboxAdd,
  outboxAll,
  outboxRemove,
  outboxCount,
} from './idb';
import type { Entidade, Produto, Financa, Parcela, Venda, EntidadeInput, ProdutoInput } from '../types/erp';



/**
 * Camada de dados do ERP_ABP.
 * FONTE DA VERDADE: Supabase (PostgREST).
 * IndexedDB: usado apenas como cache de leitura offline + fila (outbox) de escritas
 * pendentes que são reenviadas automaticamente quando a conexão volta.
 */

export function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const today = () => new Date().toISOString().split('T')[0] as string;

/* ------------------------------------------------------------------ */
/* Outbox (escritas offline)                                           */
/* ------------------------------------------------------------------ */

let flushing = false;

export async function flushOutbox(): Promise<number> {
  if (flushing || !isOnline()) return 0;
  flushing = true;
  let sent = 0;
  try {
    const ops = await outboxAll();
    for (const op of ops) {
      try {
        if (op.op === 'insert') {
          const { error } = await supabase.from(op.table).insert(op.payload as never);
          if (error) throw error;
        } else if (op.op === 'update') {
          const { error } = await supabase
            .from(op.table)
            .update(op.payload as never)
            .eq('id', op.matchId as string);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from(op.table)
            .delete()
            .in('id', op.matchIds || []);
          if (error) throw error;
        }
        if (typeof op.id === 'number') await outboxRemove(op.id);
        sent++;
      } catch {
        // Mantém na fila para a próxima tentativa
        break;
      }
    }
  } finally {
    flushing = false;
  }
  return sent;
}

export const pendingOperations = outboxCount;

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    void flushOutbox();
  });
}

/* ------------------------------------------------------------------ */
/* Helpers genéricos                                                   */
/* ------------------------------------------------------------------ */

async function remoteSelect<T>(
  table: string,
  select: string,
  order?: { column: string; ascending: boolean },
): Promise<T[] | null> {
  if (!isOnline()) return null;
  try {
    let query = supabase.from(table).select(select);
    if (order) query = query.order(order.column, { ascending: order.ascending });
    const { data, error } = await query;
    if (error) throw error;
    return (data as T[]) ?? [];
  } catch (err) {
    console.warn(`[ERP] Falha ao ler "${table}" no Supabase, usando cache offline.`, err);
    return null;
  }
}

async function remoteWrite(
  table: string,
  op: 'insert' | 'update' | 'delete',
  payload: Record<string, unknown> | Record<string, unknown>[] | undefined,
  match?: { id?: string; ids?: string[] },
): Promise<boolean> {
  if (!isOnline()) {
    await outboxAdd({
      table,
      op,
      ...(payload !== undefined ? { payload } : {}),
      ...(match?.id ? { matchId: match.id } : {}),
      ...(match?.ids ? { matchIds: match.ids } : {}),
      createdAt: new Date().toISOString(),
    });
    return false;
  }
  try {
    if (op === 'insert') {
      const { error } = await supabase.from(table).insert(payload as never);
      if (error) throw error;
    } else if (op === 'update') {
      const { error } = await supabase
        .from(table)
        .update(payload as never)
        .eq('id', match?.id as string);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from(table)
        .delete()
        .in('id', match?.ids || []);
      if (error) throw error;
    }
    return true;
  } catch (err) {
    console.warn(`[ERP] Escrita em "${table}" falhou, enfileirada para sincronizar.`, err);
    await outboxAdd({
      table,
      op,
      ...(payload !== undefined ? { payload } : {}),
      ...(match?.id ? { matchId: match.id } : {}),
      ...(match?.ids ? { matchIds: match.ids } : {}),
      createdAt: new Date().toISOString(),
    });
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Serviço                                                             */
/* ------------------------------------------------------------------ */

export const storageService = {
  flushOutbox,
  pendingOperations,

  /* ---------------- ENTIDADES ---------------- */
  async getEntidades(): Promise<Entidade[]> {
    await flushOutbox();
    const remote = await remoteSelect<Entidade>('entidades', '*', {
      column: 'nome_completo',
      ascending: true,
    });
    if (remote) {
      await idbPutMany('entidades', remote);
      return remote;
    }
    return idbGetAll<Entidade>('entidades');
  },

  async saveEntidade(entidade: EntidadeInput): Promise<Entidade> {
    const isUpdate = Boolean(entidade.id);
    const row: Entidade = {
      id: entidade.id || newId(),
      nome_completo: entidade.nome_completo || 'Sem Nome',
      cpf: entidade.cpf || '',
      data_nascimento: entidade.data_nascimento || undefined,
      email: entidade.email || '',
      telefone: entidade.telefone || '',
      tipo_entidade: entidade.tipo_entidade || 'cliente',
      status_entidade: entidade.status_entidade || 'ativo',
      cep: entidade.cep || '',
      logradouro: entidade.logradouro || '',
      numero: entidade.numero || '',
      bairro: entidade.bairro || '',
      cidade: entidade.cidade || '',
      estado: entidade.estado || '',
      foto_url: entidade.foto_url || '',
      created_at: entidade.created_at || new Date().toISOString(),
    };

    const payload: Record<string, unknown> = { ...row };
    if (!row.data_nascimento) delete payload['data_nascimento'];

    if (isUpdate) {
      const { id, created_at, ...rest } = payload as Record<string, unknown> & { id: string };
      void created_at;
      await remoteWrite('entidades', 'update', rest, { id });
    } else {
      await remoteWrite('entidades', 'insert', payload);
    }
    await idbPut('entidades', row);
    return row;
  },

  async deleteEntidades(ids: string[]): Promise<void> {
    await remoteWrite('entidades', 'delete', undefined, { ids });
    await idbDeleteMany('entidades', ids);
  },

  /* ---------------- PRODUTOS ---------------- */
  async getProdutos(): Promise<Produto[]> {
    await flushOutbox();
    const remote = await remoteSelect<Produto>('produtos', '*', { column: 'nome', ascending: true });
    if (remote) {
      await idbPutMany('produtos', remote);
      return remote;
    }
    return idbGetAll<Produto>('produtos');
  },

  async saveProduto(prod: ProdutoInput): Promise<Produto> {
    const isUpdate = Boolean(prod.id);
    const row: Produto = {
      id: prod.id || newId(),
      nome: prod.nome || 'Produto Sem Nome',
      categoria: prod.categoria || 'Geral',
      codigo_barras: prod.codigo_barras || '',
      preco_custo: Number(prod.preco_custo) || 0,
      preco_venda: Number(prod.preco_venda) || 0,
      quantidade_estoque: Number(prod.quantidade_estoque) || 0,
      estoque_minimo: Number(prod.estoque_minimo) || 5,
      descricao: prod.descricao || '',
      foto_url: prod.foto_url || '',
      created_at: prod.created_at || new Date().toISOString(),
    };

    if (isUpdate) {
      const { id, created_at, ...rest } = { ...row } as Record<string, unknown> & { id: string };
      void created_at;
      await remoteWrite('produtos', 'update', rest, { id });
    } else {
      await remoteWrite('produtos', 'insert', { ...row });
    }
    await idbPut('produtos', row);
    return row;
  },

  async deleteProdutos(ids: string[]): Promise<void> {
    await remoteWrite('produtos', 'delete', undefined, { ids });
    await idbDeleteMany('produtos', ids);
  },

  /* ---------------- FINANÇAS & PARCELAS ---------------- */
  async getFinancasWithParcelas(): Promise<{ financas: Financa[]; parcelas: Parcela[] }> {
    await flushOutbox();
    const financasRemote = await remoteSelect<Financa>('financas', '*, entidades(nome_completo)');
    const parcelasRemote = await remoteSelect<Parcela>('parcelas', '*, financas(*)');

    const financas = financasRemote ?? (await idbGetAll<Financa>('financas'));
    const parcelas = parcelasRemote ?? (await idbGetAll<Parcela>('parcelas'));

    if (financasRemote) await idbPutMany('financas', financasRemote);
    if (parcelasRemote) await idbPutMany('parcelas', parcelasRemote);

    return { financas, parcelas };
  },

  async saveLancamentoFinanceiro(params: {
    financaId?: string;
    parcelaId?: string;
    descricao: string;
    valor: number;
    tipo: 'receita' | 'despesa';
    categoria: string;
    statusLancamento: 'aberto' | 'finalizado' | 'cancelado';
    numParcelas: number;
    tipoCalculo: 'total' | 'parcela';
    recorrencia: string;
    dataVencimento: string;
    dataPagamento?: string;
    entidadeId?: string;
    codigoBarras?: string;
    boletoUrl?: string;
    comprovanteUrl?: string;
  }): Promise<void> {
    const numParcelas = Math.max(1, Number(params.numParcelas) || 1);
    const valor = Number(params.valor) || 0;
    const valorTotal =
      params.tipoCalculo === 'total' ? valor : Number((valor * numParcelas).toFixed(2));
    const valorParcela =
      params.tipoCalculo === 'total' ? Number((valor / numParcelas).toFixed(2)) : valor;

    const financaId = params.financaId || newId();
    const financa: Financa = {
      id: financaId,
      descricao: params.descricao,
      valor_total: valorTotal,
      tipo: params.tipo,
      categoria: params.categoria || 'Geral',
      status_lancamento: params.statusLancamento,
      num_parcelas: numParcelas,
      entidade_id: params.entidadeId || undefined,
      created_at: new Date().toISOString(),
    };

    const financaPayload: Record<string, unknown> = {
      id: financa.id,
      descricao: financa.descricao,
      valor_total: financa.valor_total,
      tipo: financa.tipo,
      categoria: financa.categoria,
      status_lancamento: financa.status_lancamento,
      num_parcelas: financa.num_parcelas,
      entidade_id: params.entidadeId || null,
    };

    if (params.financaId) {
      const { id, ...rest } = financaPayload as { id: string } & Record<string, unknown>;
      await remoteWrite('financas', 'update', rest, { id });
    } else {
      await remoteWrite('financas', 'insert', financaPayload);
    }
    await idbPut('financas', financa);

    if (params.parcelaId) {
      const parcela: Parcela = {
        id: params.parcelaId,
        financa_id: financaId,
        num_parcela: 1,
        valor_parcela: valorParcela,
        data_vencimento: params.dataVencimento,
        data_pagamento: params.dataPagamento || null,
        status: params.dataPagamento ? 'pago' : 'pendente',
        codigo_barra: params.codigoBarras || '',
        boleto_url: params.boletoUrl || '',
        comprovante_url: params.comprovanteUrl || '',
        financas: financa,
      };
      const { id, financas, ...rest } = { ...parcela } as Record<string, unknown> & { id: string };
      void financas;
      await remoteWrite('parcelas', 'update', rest, { id });
      await idbPut('parcelas', parcela);
      return;
    }

    const parcelas: Parcela[] = [];
    for (let i = 1; i <= numParcelas; i++) {
      const baseDate = new Date(`${params.dataVencimento}T12:00:00`);
      if (params.recorrencia === 'diario') {
        baseDate.setDate(baseDate.getDate() + (i - 1));
      } else {
        const step = parseInt(params.recorrencia, 10) || 1;
        baseDate.setMonth(baseDate.getMonth() + (i - 1) * step);
      }
      const isPaid = i === 1 && Boolean(params.dataPagamento);
      parcelas.push({
        id: newId(),
        financa_id: financaId,
        num_parcela: i,
        valor_parcela: valorParcela,
        data_vencimento: baseDate.toISOString().split('T')[0] as string,
        data_pagamento: isPaid ? params.dataPagamento || null : null,
        status: isPaid ? 'pago' : 'pendente',
        codigo_barra: params.codigoBarras || '',
        boleto_url: params.boletoUrl || '',
        comprovante_url: params.comprovanteUrl || '',
        financas: financa,
      });
    }

    await remoteWrite(
      'parcelas',
      'insert',
      parcelas.map((p) => {
        const { financas, ...rest } = p;
        void financas;
        return rest as unknown as Record<string, unknown>;
      }),
    );
    for (const p of parcelas) await idbPut('parcelas', p);
  },

  async deleteParcelas(ids: string[]): Promise<void> {
    await remoteWrite('parcelas', 'delete', undefined, { ids });
    await idbDeleteMany('parcelas', ids);
  },

  /* ---------------- VENDAS / PDV ---------------- */
  async getVendas(): Promise<Venda[]> {
    await flushOutbox();
    const remote = await remoteSelect<Venda>('vendas', '*, entidades(nome_completo)', {
      column: 'created_at',
      ascending: false,
    });
    if (remote) {
      await idbPutMany('vendas', remote);
      return remote;
    }
    return idbGetAll<Venda>('vendas');
  },

  async registerVenda(params: {
    clienteId?: string;
    carrinho: { id: string; nome: string; quantidadeCarrinho: number; preco_venda: number }[];
    desconto: number;
    formaPagamento: Venda['forma_pagamento'];
    cupomHtml: string;
  }): Promise<Venda> {
    const { clienteId, carrinho, desconto, formaPagamento, cupomHtml } = params;
    const subtotal = carrinho.reduce((acc, i) => acc + i.preco_venda * i.quantidadeCarrinho, 0);
    const total = Math.max(0, Number((subtotal - (Number(desconto) || 0)).toFixed(2)));
    const vendaId = newId();
    const nowIso = new Date().toISOString();

    const venda: Venda = {
      id: vendaId,
      entidade_id: clienteId || null,
      valor_total: total,
      desconto: Number(desconto) || 0,
      forma_pagamento: formaPagamento,
      status: 'concluida',
      created_at: nowIso,
    };

    // 1. Venda
    await remoteWrite('vendas', 'insert', {
      id: vendaId,
      entidade_id: clienteId || null,
      valor_total: total,
      desconto: Number(desconto) || 0,
      forma_pagamento: formaPagamento,
      status: 'concluida',
    });
    await idbPut('vendas', venda);

    // 2. Itens da venda
    if (carrinho.length > 0) {
      await remoteWrite(
        'itens_venda',
        'insert',
        carrinho.map((item) => ({
          id: newId(),
          venda_id: vendaId,
          produto_id: item.id,
          quantidade: item.quantidadeCarrinho,
          preco_unitario: item.preco_venda,
          subtotal: Number((item.preco_venda * item.quantidadeCarrinho).toFixed(2)),
        })),
      );
    }

    // 3. Baixa de estoque
    const produtos = await idbGetAll<Produto>('produtos');
    for (const item of carrinho) {
      const prod = produtos.find((p) => p.id === item.id);
      const atual = prod ? prod.quantidade_estoque : 0;
      const novo = Math.max(0, atual - item.quantidadeCarrinho);
      await remoteWrite('produtos', 'update', { quantidade_estoque: novo }, { id: item.id });
      if (prod) await idbPut('produtos', { ...prod, quantidade_estoque: novo });
    }

    // 4. Receita financeira + parcela quitada (com cupom)
    const idCurto = vendaId.substring(0, 8).toUpperCase();
    const financaId = newId();
    const dataUriCupom = `data:text/html;charset=utf-8,${encodeURIComponent(cupomHtml)}`;
    const financa: Financa = {
      id: financaId,
      descricao: `Venda PDV - Cupom #${idCurto} (${formaPagamento})`,
      valor_total: total,
      tipo: 'receita',
      num_parcelas: 1,
      categoria: 'Vendas',
      status_lancamento: 'finalizado',
      entidade_id: clienteId || undefined,
      created_at: nowIso,
    };
    await remoteWrite('financas', 'insert', {
      id: financaId,
      entidade_id: clienteId || null,
      descricao: financa.descricao,
      valor_total: total,
      tipo: 'receita',
      num_parcelas: 1,
      categoria: 'Vendas',
      status_lancamento: 'finalizado',
    });
    await idbPut('financas', financa);

    const parcela: Parcela = {
      id: newId(),
      financa_id: financaId,
      num_parcela: 1,
      valor_parcela: total,
      data_vencimento: today(),
      data_pagamento: today(),
      status: 'pago',
      comprovante_url: dataUriCupom,
      financas: financa,
    };
    await remoteWrite('parcelas', 'insert', {
      id: parcela.id,
      financa_id: financaId,
      num_parcela: 1,
      valor_parcela: total,
      data_vencimento: parcela.data_vencimento,
      data_pagamento: parcela.data_pagamento,
      status: 'pago',
      comprovante_url: dataUriCupom,
    });
    await idbPut('parcelas', parcela);

    return venda;
  },

  async registerSangria(valor: number, motivo: string): Promise<void> {
    const financaId = newId();
    const nowIso = new Date().toISOString();
    const financa: Financa = {
      id: financaId,
      descricao: `Sangria Caixa: ${motivo}`,
      valor_total: Number(valor) || 0,
      tipo: 'despesa',
      num_parcelas: 1,
      categoria: 'Sangria',
      status_lancamento: 'finalizado',
      created_at: nowIso,
    };
    await remoteWrite('financas', 'insert', {
      id: financaId,
      descricao: financa.descricao,
      valor_total: financa.valor_total,
      tipo: 'despesa',
      num_parcelas: 1,
      categoria: 'Sangria',
      status_lancamento: 'finalizado',
    });
    await idbPut('financas', financa);

    const parcela: Parcela = {
      id: newId(),
      financa_id: financaId,
      num_parcela: 1,
      valor_parcela: financa.valor_total,
      data_vencimento: today(),
      data_pagamento: today(),
      status: 'pago',
      financas: financa,
    };
    await remoteWrite('parcelas', 'insert', {
      id: parcela.id,
      financa_id: financaId,
      num_parcela: 1,
      valor_parcela: parcela.valor_parcela,
      data_vencimento: parcela.data_vencimento,
      data_pagamento: parcela.data_pagamento,
      status: 'pago',
    });
    await idbPut('parcelas', parcela);
  },

  async deleteVenda(vendaId: string): Promise<void> {
    const idCurto = vendaId.substring(0, 8).toUpperCase();

    // 1. Devolve os itens da venda ao estoque
    let itens: { produto_id: string; quantidade: number }[] = [];
    if (isOnline()) {
      try {
        const { data } = await supabase
          .from('itens_venda')
          .select('produto_id, quantidade')
          .eq('venda_id', vendaId);
        itens = (data as typeof itens) ?? [];
      } catch {
        itens = [];
      }
    }

    if (itens.length > 0) {
      const produtos = await idbGetAll<Produto>('produtos');
      for (const item of itens) {
        const prod = produtos.find((p) => p.id === item.produto_id);
        const novo = (prod ? prod.quantidade_estoque : 0) + (Number(item.quantidade) || 0);
        await remoteWrite('produtos', 'update', { quantidade_estoque: novo }, { id: item.produto_id });
        if (prod) await idbPut('produtos', { ...prod, quantidade_estoque: novo });
      }
    }

    // 2. Remove o lançamento financeiro (receita) e suas parcelas
    const financas = await idbGetAll<Financa>('financas');
    let financaIds = financas
      .filter((f) => (f.descricao || '').includes(`Cupom #${idCurto}`))
      .map((f) => f.id);

    if (isOnline()) {
      try {
        const { data } = await supabase
          .from('financas')
          .select('id')
          .ilike('descricao', `%Cupom #${idCurto}%`);
        const remoteIds = ((data as { id: string }[]) ?? []).map((f) => f.id);
        financaIds = Array.from(new Set([...financaIds, ...remoteIds]));
      } catch {
        /* usa apenas o cache local */
      }
    }

    if (financaIds.length > 0) {
      const parcelas = await idbGetAll<Parcela>('parcelas');
      const parcelaIds = parcelas
        .filter((p) => financaIds.includes(p.financa_id))
        .map((p) => p.id);
      if (isOnline()) {
        try {
          const { data } = await supabase
            .from('parcelas')
            .select('id')
            .in('financa_id', financaIds);
          for (const p of ((data as { id: string }[]) ?? [])) {
            if (!parcelaIds.includes(p.id)) parcelaIds.push(p.id);
          }
        } catch {
          /* ignora */
        }
      }
      if (parcelaIds.length > 0) {
        await remoteWrite('parcelas', 'delete', undefined, { ids: parcelaIds });
        await idbDeleteMany('parcelas', parcelaIds);
      }
      await remoteWrite('financas', 'delete', undefined, { ids: financaIds });
      await idbDeleteMany('financas', financaIds);
    }

    // 3. Remove os itens e a venda
    try {
      if (isOnline()) await supabase.from('itens_venda').delete().eq('venda_id', vendaId);
    } catch {
      /* itens são removidos em cascata no banco */
    }
    await remoteWrite('vendas', 'delete', undefined, { ids: [vendaId] });
    await idbDeleteMany('vendas', [vendaId]);
  },


  /* ---------------- BACKUP ---------------- */
  async exportBackupJSON(): Promise<string> {
    const [entidades, produtos, financas, parcelas, vendas] = await Promise.all([
      idbGetAll<Entidade>('entidades'),
      idbGetAll<Produto>('produtos'),
      idbGetAll<Financa>('financas'),
      idbGetAll<Parcela>('parcelas'),
      idbGetAll<Venda>('vendas'),
    ]);
    return JSON.stringify(
      { version: '2.0', exportedAt: new Date().toISOString(), entidades, produtos, financas, parcelas, vendas },
      null,
      2,
    );
  },

  /** Importa um backup enviando os registros para o Supabase (fonte da verdade). */
  async importBackupJSON(jsonStr: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(jsonStr) as Record<string, unknown[]>;
      for (const table of ['entidades', 'produtos', 'financas', 'parcelas', 'vendas']) {
        const rows = parsed[table];
        if (!Array.isArray(rows) || rows.length === 0) continue;
        const clean = rows.map((r) => {
          const row = { ...(r as Record<string, unknown>) };
          delete row['entidades'];
          delete row['financas'];
          delete row['produtos'];
          return row;
        });
        if (isOnline()) {
          const { error } = await supabase.from(table).upsert(clean as never);
          if (error) console.warn(`[ERP] Import ${table}:`, error.message);
        }
        await idbPutMany(table, clean as { id: string }[]);
      }
      return true;
    } catch (err) {
      console.warn('[ERP] Backup inválido', err);
      return false;
    }
  },
};

/** Verifica se o schema esperado existe no Supabase. */
export async function checkSchema(): Promise<{ ok: boolean; missing: string[] }> {
  const tables = ['entidades', 'produtos', 'financas', 'parcelas', 'vendas', 'itens_venda'];
  if (!isOnline()) return { ok: true, missing: [] };
  const missing: string[] = [];
  for (const t of tables) {
    const { error } = await supabase.from(t).select('id').limit(1);
    if (error && (error.code === 'PGRST205' || /schema cache/i.test(error.message))) missing.push(t);
  }
  return { ok: missing.length === 0, missing };
}
