// Toggle show/hide password
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        togglePassword.src = isPassword ? 'assets/show.svg' : 'assets/hide.svg';
    });
}

// Navigasi tombol admin/user
const userBtn = document.getElementById("userBtn");
const signinBtn = document.getElementById("signin-btn");
const reservasiBtn = document.getElementById("reservasi-btn");
const rsvSemeruBtn = document.getElementById("reservasi-semeru-btn");

if (signinBtn) {
    signinBtn.addEventListener("click", () => {
        window.location.href = "home.html";
    });
}

if (userBtn) {
    userBtn.addEventListener("click", () => {
        window.location.href = "loginUser.html";
    });
}


if (backToReservasiBtn) {
    backToReservasiBtn.addEventListener("click", () => {
        window.location.href = "formReservasi.html";
    });
}

if (rsvSemeruBtn) {
    rsvSemeruBtn.addEventListener("click", () => {
        window.location.href = "semeru-page.html";
    });
}

// Toggle form Sign In ↔ Register
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const signInForm = document.getElementById("signInForm");
const registerForm = document.getElementById("registerForm");

if (showRegister && showLogin) {
    showRegister.addEventListener("click", () => {
        signInForm.style.display = "none";
        registerForm.style.display = "block";
    });

    showLogin.addEventListener("click", () => {
        registerForm.style.display = "none";
        signInForm.style.display = "block";
    });
}


// Tombol menuju halaman reservasi
function pindahKeReservasi() {
    console.log("Memindahkan ke halaman reservasi...");
    window.location.href = "reservasi.html";
}


const tombolReservasi = document.getElementsByClassName("btnReservasi")[0];
if (tombolReservasi) {
    tombolReservasi.addEventListener("click", pindahKeFormReservasi);
}

//LAPORAN USER

// File upload handler
const fileInput = document.getElementById('buktiFoto');
const fileNameDisplay = document.getElementById('fileName');

fileInput.addEventListener('change', function () {
    if (this.files.length > 0) {
        if (this.files.length === 1) {
            fileNameDisplay.textContent = this.files[0].name;
        } else {
            fileNameDisplay.textContent = `${this.files.length} files selected`;
        }
    } else {
        fileNameDisplay.textContent = 'No file chosen';
    }
});

// Form submission handler
const reportForm = document.getElementById('reportForm');
reportForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        namaPelapor: document.getElementById('namaPelapor').value,
        tanggalKejadian: document.getElementById('tanggalKejadian').value,
        lokasiKejadian: document.getElementById('lokasiKejadian').value,
        deskripsi: document.getElementById('deskripsi').value,
        buktiFoto: fileInput.files.length > 0 ? Array.from(fileInput.files).map(f => f.name) : []
    };

    console.log('Form Data:', formData);
    alert('Laporan berhasil dikirim!\n\nData telah disimpan.');

    // Reset form
    reportForm.reset();
    fileNameDisplay.textContent = 'No file chosen';
});

// Set max date to today
const dateInput = document.getElementById('tanggalKejadian');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('max', today);