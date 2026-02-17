/**
 * BUSCA UNIVERSAL – MODAL INDEPENDENTE
 * Autor: Aristidesbp
 * Descrição:
 * Componente de busca reutilizável, independente de CSS externo,
 * que abre um modal para seleção de entidades vindas do Supabase.
 */

/* =======================
   INJEÇÃO DE CSS ISOLADO
======================= */
(function injetarCSSBuscaUniversal() {
  if (document.getElementById('bu-css')) return;

  const style = document.createElement('style');
  style.id = 'bu-css';
  style.innerHTML = `
    .bu-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .bu-modal {
      background: #fff;
      width: 90%;
      max-width: 520px;
      border-radius: 10px;
      padding: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,.25);
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-family: Arial, sans-serif;
    }
    .bu-header {
      font-weight: bold;
      font-size: 16px;
    }
    .bu-input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
      outline: none;
    }
    .bu-lista {
      max-height: 280px;
      overflow-y: auto;
      border: 1px solid #eee;
      border-radius: 6px;
    }
    .bu-item {
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid #f1f1f1;
      transition: background .15s;
    }
    .bu-item:hover {
      background: #f0fdf4;
    }
    .bu-item strong {
      display: block;
      font-size: 14px;
      color: #111;
    }
    .bu-item span {
      font-size: 11px;
      color: #666;
    }
    .bu-empty {
      padding: 12px;
      font-size: 12px;
      color: #777;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
})();

/* =======================
   MODAL DE BUSCA
======================= */
function abrirModalBuscaUniversal({ tabela, dados, onSelecionar }) {
  const overlay = document.createElement('div');
  overlay.className = 'bu-overlay';

  overlay.innerHTML = `
    <div class="bu-modal">
      <div class="bu-header">Selecionar registro</div>
      <input type="text" class="bu-input" placeholder="Digite para buscar...">
      <div class="bu-lista"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  const input = overlay.querySelector('.bu-input');
  const lista = overlay.querySelector('.bu-lista');

  function obterTextoPrincipal(item) {
    return item.nome || item.nome_completo || item.descricao || item.title || 'Registro';
  }

  function obterTextoSecundario(item) {
    return item.cpf || item.tipo || item.codigo || '';
  }

  function renderizar(termo = '') {
    lista.innerHTML = '';

    const filtrados = termo
      ? dados.filter(d =>
          Object.values(d)
            .join(' ')
            .toLowerCase()
            .includes(termo)
        )
      : dados;

    if (filtrados.length === 0) {
      lista.innerHTML = `<div class="bu-empty">Nenhum resultado encontrado</div>`;
      return;
    }

    filtrados.forEach(item => {
      const div = document.createElement('div');
      div.className = 'bu-item';
      div.innerHTML = `
        <strong>${obterTextoPrincipal(item)}</strong>
        <span>${obterTextoSecundario(item)}</span>
      `;
      div.onclick = () => {
        onSelecionar(item);
        overlay.remove();
      };
      lista.appendChild(div);
    });
  }

  input.addEventListener('input', e => {
    renderizar(e.target.value.toLowerCase());
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });

  input.focus();
  renderizar();
}

/* =======================
   INICIALIZA COMPONENTES
======================= */
async function inicializarBuscaUniversal() {
  const componentes = document.querySelectorAll('.componente-busca');

  for (const container of componentes) {
    const tabela = container.dataset.tabela;
    const inputTexto = container.querySelector('.input-busca-texto');
    const btn = container.querySelector('.btn-disparar-busca');
    const inputHidden = container.querySelector('.id-selecionado-hidden');

    if (!tabela || !inputTexto || !btn) {
      console.warn('Componente de busca incompleto.');
      continue;
    }

    inputTexto.readOnly = true;

    let cache = [];

    try {
      const { data, error } = await window.supabaseClient
        .from(tabela)
        .select('*');

      if (error) throw error;
      cache = data || [];

      btn.addEventListener('click', () => {
        abrirModalBuscaUniversal({
          tabela,
          dados: cache,
          onSelecionar: item => {
            inputTexto.value =
              item.nome || item.nome_completo || item.descricao || '';
            if (inputHidden) inputHidden.value = item.id;
          }
        });
      });

    } catch (err) {
      console.error(`Erro ao carregar dados da tabela ${tabela}`, err.message);
    }
  }
}

document.addEventListener('DOMContentLoaded', inicializarBuscaUniversal);
