
 /**
 * Nome do arquivo: idioma.js
 * Objetivo: Alterar o texto principal (Hero) conforme o idioma selecionado.
 */
function changeLang() {
    const lang = document.getElementById('langSelect').value;
    const title = document.getElementById('heroTitle');
    
    // Dicionário de traduções
    const translations = {
        es: 'Transformando Necesidades Reales en <span class="text-primary">Soluciones Digitales</span>',
        en: 'Transforming Real Needs into Functional <span class="text-primary">Digital Solutions</span>',
        pt: 'Transformando Necessidades Reais em <span class="text-primary">Soluções Digitais</span> Funcionais'
    };

    // Aplica a tradução ou mantém o padrão em português
    title.innerHTML = translations[lang] || translations.pt;
}

