document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const agreeCheckbox = document.getElementById('agreeCheckbox');

    backBtn.addEventListener('click', () => {
        window.location.href = "semeru-page.html";
    });

    nextBtn.addEventListener('click', () => {
        if (!agreeCheckbox.checked) {
            alert("Harap menyetujui peraturan sebelum melanjutkan.");
            return;
        }
        sessionStorage.setItem('setujuPeraturan', true);
        window.location.href = "semeru-page-3.html";
    });
});
