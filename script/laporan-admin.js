function loadData() {
    let laporanList = JSON.parse(localStorage.getItem("laporanHikepass")) || [];
    const tableBody = document.getElementById("dataLaporan");

    tableBody.innerHTML = "";

    laporanList.forEach((laporan) => {
        let row = `
        <tr>
            <td>${laporan.nama}</td>
            <td>${laporan.email}</td>
            <td>${laporan.tanggal}</td>
            <td>${laporan.kategori}</td>
            <td>${laporan.lokasi}</td>
            <td>${laporan.deskripsi}</td>
            <td>${laporan.foto}</td>
            <td>
                <button class="secondary" onclick="hapusLaporan(${laporan.id})">Hapus</button>
            </td>
        </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function hapusLaporan(id) {
    let laporanList = JSON.parse(localStorage.getItem("laporanHikepass")) || [];
    let updated = laporanList.filter(item => item.id !== id);

    localStorage.setItem("laporanHikepass", JSON.stringify(updated));
    loadData();
}

document.getElementById("refreshBtn").addEventListener("click", () => {
    loadData();
});

loadData();
