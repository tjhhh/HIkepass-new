
function pindahKeReservasi(){
    console.log("memindahkkan ke halaman reservasi...")
    window.location.href = "reservasi.html"
}

const tombolReservasi = document.getElementsByClassName("btnReservasiHome")[0];
tombolReservasi.addEventListener("click",pindahKeReservasi)