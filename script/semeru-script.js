// Script untuk tombol plus-minus tiket
const minusBtn = document.getElementById('minusBtn');
const plusBtn = document.getElementById('plusBtn');
const ticketCount = document.getElementById('ticketCount');
const nextBtn = document.getElementById('nextBtn');

let count = 0;
const max = 8;

// Update tampilan tombol sesuai kondisi
function updateButtons() {
  minusBtn.disabled = count === 0;
  plusBtn.disabled = count === max;
  ticketCount.textContent = count;
}

plusBtn.addEventListener('click', () => {
  if (count < max) {
    count++;
    updateButtons();
  }
});

minusBtn.addEventListener('click', () => {
  if (count > 0) {
    count--;
    updateButtons();
  }
});

nextBtn.addEventListener('click', (e) => {
  e.preventDefault(); // cegah reload form
  if (count === 0) {
    alert("Silakan pilih minimal 1 tiket untuk melanjutkan.");
  } else {
    sessionStorage.setItem('jumlahTiket', count);
    window.location.href = "semeru-page-2.html";
  }
});


updateButtons();