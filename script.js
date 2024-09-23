<script>
        // Função de animação do confete
        function startConfetti() {
            const confettiSound = document.getElementById('confettiSound');
            confettiSound.play();

            var duration = 5 * 1000;
            var end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }

        // Ação do botão
        document.getElementById('cta-btn').addEventListener('click', function(event) {
            event.preventDefault();
            startConfetti();

            setTimeout(function() {
                window.location.href = 'home.html';
            }, 5000); // Espera 5 segundos antes de redirecionar
        });
    </script>
