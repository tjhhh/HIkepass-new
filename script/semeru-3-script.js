document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const ticketCount = sessionStorage.getItem("jumlahTiket");

    backBtn.addEventListener("click", () => {
        window.location.href = "semeru-page-2.html";
    });

    nextBtn.addEventListener("click", () => {
        window.location.href = "semeru-page-4.html"; // nanti bisa lanjut ke halaman berikutnya
    });

    const isiDataBtn1 = document.getElementById("isiDataBtn1");
    const pemesanText1 = document.getElementById("pemesanText1");

    // Buat input dinamis (disembunyikan dulu)
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Masukkan nama pemesan...";
    inputField.classList.add("input-nama");
    inputField.style.display = "none";

    // Sisipkan input setelah teks
    pemesanText1.parentElement.appendChild(inputField);

    isiDataBtn1.addEventListener("click", () => {
        if (inputField.style.display === "none") {
            // Tampilkan input & fokuskan
            inputField.style.display = "block";
            inputField.focus();
            isiDataBtn1.textContent = "Simpan";
        } else {
            // Simpan nama & sembunyikan input
            const nama = inputField.value.trim();
            if (nama === "") {
                alert("Nama tidak boleh kosong!");
                inputField.focus();
                return;
            }

            pemesanText1.textContent = nama;
            pemesanText1.style.color = "#0c665c";
            inputField.style.display = "none";
            isiDataBtn1.textContent = "Edit Data";
        }
    });
});