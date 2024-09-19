document.addEventListener("DOMContentLoaded", () => {
    const slideBtn = document.getElementById("slideBtn");

    slideBtn.classList.add("hidden");

    slideBtn.addEventListener("click", () => {
        slideBtn.classList.toggle("slid");
    });
});
