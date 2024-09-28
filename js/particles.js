
// particles.js [ vc fez esse ]
document.addEventListener("DOMContentLoaded", function () {
    fetch('particles.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('particles').innerHTML = data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
