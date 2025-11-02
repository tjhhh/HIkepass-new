// ===== RESERVASI SCRIPT =====
document.addEventListener("DOMContentLoaded", () => {
    const reservasiButtons = document.querySelectorAll(".btnReservasi");
    reservasiButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            window.location.href = "isi-data.html";
        });
    });
});
