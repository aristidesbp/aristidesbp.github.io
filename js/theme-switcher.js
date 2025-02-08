document.querySelector("#theme-toggle").addEventListener("click", () => {
    document.body.dataset.theme = 
        document.body.dataset.theme === "dark" ? "light" : "dark";
});