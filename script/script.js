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
const adminBtn = document.getElementById("adminBtn");
const userBtn = document.getElementById("userBtn");
if (adminBtn) {
    adminBtn.addEventListener("click", () => {
        window.location.href = "loginAdmin.html";
    });
}
if (userBtn) {
    userBtn.addEventListener("click", () => {
        window.location.href = "loginUser.html";
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
    tombolReservasi.addEventListener("click", pindahKeReservasi);
}
