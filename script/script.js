
function pindahKeReservasi(){
    console.log("memindahkkan ke halaman reservasi...")
    window.location.href = "reservasi.html"
}

const tombolReservasi = document.getElementById("btn-reservasi");
tombolReservasi.addEventListener("click",pindahKeReservasi)
