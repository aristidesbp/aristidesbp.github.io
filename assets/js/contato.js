// Função para criar dinamicamente a seção de contato
function createContactSection() {
    // Verifica se o elemento com ID 'contact' já existe para evitar duplicação
    if (document.getElementById('contact')) {
        console.warn('A seção de contato já existe no DOM.');
        return;
    }

    // Cria os elementos necessários para a seção
    const section = document.createElement('section');
    section.id = 'contact';

    // Adiciona uma estrutura HTML à seção
    section.innerHTML = `
        <div class="wrapper">
            <div class="col-a">
                <header>
                    <h2>Fale comigo!</h2>
                </header>
                <div class="content">
                    <ul>
                        <li>
                            <a href="mailto: aristidesbp@gmail.com" title="Enviar e-mail">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                        stroke="#00856F"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M22 6L12 13L2 6"
                                        stroke="#00856F"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                aristidesbp@gmail.com
                            </a>
                        </li>
                        <li>
                            <a href="tel:+5591992420981" title="Fazer ligação">
                                <img
                                    src="./assets/icons/celular.svg"
                                    alt="Ícone de celular."
                                    id="cel"
                                />
                                +55 91 99242-0981
                            </a>
                        </li>
                    </ul>
                    <a
                        class="button"
                        title="Me chama no zap!"
                        href="https://api.whatsapp.com/send?phone=5591992420981&text=Fala,%20Aristides!%20Vim%20do%20teu%20portifólio,%20quero%20trabalhar%20contigo!"
                        target="_blank"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.6 14.0001C16.4 13.9001 15.1 13.3001 14.9 13.2001C14.7 13.1001 14.5 13.1001 14.3 13.3001C14.1 13.5001 13.7 14.1001 13.5 14.3001C13.4 14.5001 13.2 14.5001 13 14.4001C12.3 14..."
                                fill="white"
                            />
                        </svg>
                        WhatsApp
                    </a>
                </div>
            </div>
            <div class="col-b">
                <img src="./assets/images/celular-2.png" alt="Ícone de celular." />
            </div>
        </div>
    `;

    // Adiciona a seção ao final do body
    document.body.appendChild(section);
}

// Chama a função para criar a seção de contato
createContactSection();
