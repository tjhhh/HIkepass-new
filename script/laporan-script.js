document.getElementById("reportForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil data dari form
    const laporan = {
        nama: document.getElementById("nama").value,
        email: document.getElementById("email").value,
        tanggal: document.getElementById("tanggal").value,
        kategori: document.getElementById("kategori").value,
        lokasi: document.getElementById("lokasi").value,
        deskripsi: document.getElementById("deskripsi").value,
        foto: document.getElementById("foto").value.split("\\").pop() || "",
        id: Date.now() 
    };

    // Ambil data lama di localStorage
    let semuaLaporan = JSON.parse(localStorage.getItem("laporanHikepass")) || [];

    // Masukkan laporan baru
    semuaLaporan.push(laporan);

    // Simpan lagi ke localStorage
    localStorage.setItem("laporanHikepass", JSON.stringify(semuaLaporan));

    alert("Laporan berhasil dikirim!");
    this.reset();
});
