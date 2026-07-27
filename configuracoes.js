// ══════════════════════════════════════════════════════════════════════════
//      MÓDULO CONFIGURAÇÕES — INTEGRAÇÃO SUPABASE & APIs DO BROWSER
// ══════════════════════════════════════════════════════════════════════════

// 1. Permissão de Câmera
async function cfg_solicitarPermissaoCamera() {
    const statusDiv = document.getElementById('status-permissao-camera');
    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Seu navegador ou dispositivo não suporta o acesso à câmera.");
            return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        stream.getTracks().forEach(track => track.stop());
        
        statusDiv.classList.remove('hidden');
        statusDiv.className = "text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800";
        statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Permissão concedida com sucesso! A câmera já pode ser utilizada nos módulos.';
        alert("Permissão de câmera concedida com sucesso!");
    } catch (error) {
        console.error("Erro ao solicitar permissão de câmera:", error);
        statusDiv.classList.remove('hidden');
        statusDiv.className = "text-xs font-bold text-red-600 dark:text-red-400 mt-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800";
        statusDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Permissão negada ou indisponível: ${error.message}`;
        alert("Não foi possível obter acesso à câmera. Verifique as configurações do navegador.");
    }
}

// 2. Permissão de Contatos
async function cfg_solicitarPermissaoContatos() {
    const statusDiv = document.getElementById('status-permissao-contatos');
    statusDiv.classList.remove('hidden');
    try {
        if ('contacts' in navigator && 'select' in navigator.contacts) {
            const props = ['name', 'tel', 'email'];
            const opts = { multiple: true };
            const contacts = await navigator.contacts.select(props, opts);
            
            statusDiv.className = "text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800";
            statusDiv.innerHTML = `<i class="fas fa-check-circle"></i> Permissão concedida! ${contacts.length} contato(s) selecionado(s).`;
        } else {
            statusDiv.className = "text-xs font-bold text-amber-600 dark:text-amber-400 mt-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800";
            statusDiv.innerHTML = '<i class="fas fa-info-circle"></i> O navegador não possui suporte nativo à API de Contatos, mas a preferência foi registrada.';
            alert("Acesso a contatos simulado/registrado com sucesso.");
        }
    } catch (error) {
        console.error("Erro ao acessar contatos:", error);
        statusDiv.className = "text-xs font-bold text-red-600 dark:text-red-400 mt-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800";
        statusDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Erro: ${error.message}`;
    }
}

// 3. Caminho de Download
async function cfg_selecionarPastaDownload() {
    const inputCaminho = document.getElementById('input-caminho-download');
    try {
        if (window.showDirectoryPicker) {
            const dirHandle = await window.showDirectoryPicker();
            inputCaminho.value = dirHandle.name ? `Diretório: ${dirHandle.name}` : "Pasta selecionada com sucesso";
            localStorage.setItem('erp_download_path', inputCaminho.value);
            alert("Pasta de downloads configurada com sucesso!");
        } else {
            alert("Seu navegador não suporta a seleção direta de pastas. Insira o caminho manualmente.");
        }
    } catch (error) {
        console.error("Seleção de pasta cancelada:", error);
    }
}

function cfg_salvarConfiguracaoPasta() {
    const caminho = document.getElementById('input-caminho-download').value;
    if (!caminho.trim()) {
        alert("Insira ou selecione um caminho válido antes de salvar.");
        return;
    }
    localStorage.setItem('erp_download_path', caminho);
    alert("Caminho da pasta salvo com sucesso!");
}

// Carregar caminho salvo ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    const caminhoSalvo = localStorage.getItem('erp_download_path');
    if (caminhoSalvo) {
        const inputCaminho = document.getElementById('input-caminho-download');
        if (inputCaminho) inputCaminho.value = caminhoSalvo;
    }
});

// 4. Backup via Supabase (JSON)
async function cfg_fazerBackupBanco() {
    try {
        const tabelas = ['entidades', 'produtos', 'financas', 'parcelas'];
        const backupData = {
            versao_sistema: "ERP_Supabase_v1",
            data_backup: new Date().toISOString(),
            tabelas: {}
        };

        for (const tabela of tabelas) {
            const { data, error } = await _supabase.from(tabela).select('*');
            if (!error) {
                backupData.tabelas[tabela] = data || [];
            }
        }

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        const dataFormatada = new Date().toISOString().slice(0, 10);
        downloadAnchor.setAttribute("download", `backup_erp_${dataFormatada}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();

        alert("Backup do Supabase gerado e baixado com sucesso!");
    } catch (error) {
        console.error("Erro ao gerar backup:", error);
        alert("Erro ao gerar o arquivo de backup: " + error.message);
    }
}

// 5. Restauração de Backup no Supabase
async function cfg_restaurarBackupBanco(input) {
    const file = input.files[0];
    if (!file) return;

    if (!confirm("⚠️ ATENÇÃO: Restaurar o backup irá inserir/atualizar os dados no Supabase. Deseja continuar?")) {
        input.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const backupData = JSON.parse(e.target.result);
            if (!backupData.tabelas) {
                throw new Error("O arquivo selecionado não é um backup válido.");
            }

            for (const [tabela, registros] of Object.entries(backupData.tabelas)) {
                if (Array.isArray(registros) && registros.length > 0) {
                    const { error } = await _supabase.from(tabela).upsert(registros);
                    if (error) console.error(`Erro ao restaurar ${tabela}:`, error);
                }
            }

            alert("✅ Backup restaurado com sucesso! O sistema será recarregado.");
            location.reload();
        } catch (error) {
            console.error("Erro ao restaurar backup:", error);
            alert("Erro ao processar o arquivo de backup: " + error.message);
        } finally {
            input.value = '';
        }
    };
    reader.readAsText(file);
}

// 6. Importação de XML de NF-e (Integrado ao Supabase)
async function cfg_processarXmlNfeGeral(input) {
    const arquivo = input.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = async function(e) {
        try {
            const conteudoXml = e.target.result;
            const xmlDoc = new DOMParser().parseFromString(conteudoXml, "text/xml");
            const nfeProc = xmlDoc.querySelector("nfeProc") || xmlDoc.querySelector("NFe");

            if (!nfeProc) {
                alert("Erro: O arquivo selecionado não é um XML de NF-e válido.");
                return;
            }

            // Emitente / Fornecedor
            const emit = xmlDoc.querySelector("emit");
            const cnpjEmitente = emit?.querySelector("CNPJ")?.textContent || "";
            const nomeEmitente = emit?.querySelector("xNome")?.textContent || "Fornecedor XML";
            const foneEmitente = emit?.querySelector("fone")?.textContent || "";

            let fornecedorId;
            const { data: entExistente } = await _supabase.from('entidades').select('id').eq('cpf', cnpjEmitente).maybeSingle();

            if (entExistente) {
                fornecedorId = entExistente.id;
            } else {
                const { data: novoEnt, error: errEnt } = await _supabase.from('entidades').insert([{
                    nome_completo: nomeEmitente,
                    cpf: cnpjEmitente,
                    telefone: foneEmitente,
                    tipo_entidade: 'fornecedor',
                    status_entidade: 'ativo',
                    user_id: usuarioLogadoId
                }]).select().single();
                if (errEnt) throw errEnt;
                fornecedorId = novoEnt.id;
            }

            // Produtos
            const detalhesItens = xmlDoc.querySelectorAll("det");
            let produtosProcessados = 0;

            for (const det of detalhesItens) {
                const prod = det.querySelector("prod");
                if (!prod) continue;

                const codigoBarras = prod.querySelector("cEAN")?.textContent || prod.querySelector("cProd")?.textContent || "";
                const nomeProduto = prod.querySelector("xProd")?.textContent || "";
                const quantidade = parseFloat(prod.querySelector("qCom")?.textContent || "0");
                const valorUnitario = parseFloat(prod.querySelector("vUnCom")?.textContent || "0");

                const { data: prodExistente } = await _supabase.from('produtos').select('*').eq('codigo_barras', codigoBarras).maybeSingle();

                if (prodExistente) {
                    await _supabase.from('produtos').update({
                        quantidade_estoque: (prodExistente.quantidade_estoque || 0) + quantidade,
                        preco_custo: valorUnitario
                    }).eq('id', prodExistente.id);
                } else {
                    await _supabase.from('produtos').insert([{
                        nome: nomeProduto,
                        codigo_barras: codigoBarras || null,
                        preco_custo: valorUnitario,
                        preco_venda: valorUnitario * 1.3,
                        quantidade_estoque: quantidade,
                        estoque_minimo: 5,
                        categoria: "Geral"
                    }]);
                }
                produtosProcessados++;
            }

            // Financeiro
            const totalNota = xmlDoc.querySelector("total > ICMSTot > vNF")?.textContent;
            const valorTotalNFe = totalNota ? parseFloat(totalNota) : 0;
            const numeroNFe = xmlDoc.querySelector("ide > nNF")?.textContent || "S/N";
            const dataEmissao = xmlDoc.querySelector("ide > dhEmi")?.textContent?.split('T')[0] || new Date().toISOString().split('T')[0];

            if (valorTotalNFe > 0) {
                const { data: novaFinanca, error: errFin } = await _supabase.from('financas').insert([{
                    entidade_id: fornecedorId,
                    descricao: `Compra NF-e #${numeroNFe} - ${nomeEmitente}`,
                    valor_total: valorTotalNFe,
                    tipo: "despesa",
                    num_parcelas: 1,
                    categoria: "Compras NF-e",
                    status_lancamento: "pendente"
                }]).select().single();

                if (!errFin && novaFinanca) {
                    await _supabase.from('parcelas').insert([{
                        financa_id: novaFinanca.id,
                        num_parcela: 1,
                        valor_parcela: valorTotalNFe,
                        data_vencimento: dataEmissao,
                        status: "pendente"
                    }]);
                }
            }

            alert(`Importação concluída com sucesso!\n- ${produtosProcessados} produtos atualizados/cadastrados.\n- Conta a pagar gerada no financeiro.`);
            input.value = "";
        } catch (erro) {
            console.error("Falha ao processar o XML:", erro);
            alert("Erro crítico ao ler o arquivo XML: " + erro.message);
        }
    };
    leitor.readAsText(arquivo, "UTF-8");
}
