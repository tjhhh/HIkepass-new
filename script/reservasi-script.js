document.addEventListener("DOMContentLoaded", () => {

    // Semua tombol reservasi
    const buttons = document.querySelectorAll(".btnReservasi");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const mountainName = btn.closest(".mountain-card")
                                     .querySelector(".mountain-card__title")
                                     .textContent.trim();

            // Routing berdasarkan nama gunung
            switch (mountainName) {
                case "Gunung Semeru":
                    window.location.href = "semeru-page.html";
                    break;

                case "Gunung Gede Pangrango":
                    window.location.href = "gede-page.html";
                    break;

                case "Gunung Cikuray":
                    window.location.href = "cikuray-page.html";
                    break;

                default:
                    alert("Halaman gunung belum tersedia 😊");
                    break;
            }
        });
    });

});
