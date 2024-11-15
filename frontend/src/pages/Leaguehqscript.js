function togglePanel(id) {
    const panel = document.getElementById(id);
    panel.classList.toggle("active");
    panel.style.display = panel.classList.contains("active") ? "block" : "none";
}
