// ========================================
// ISI DATA SCRIPT - GUNUNG SEMERU (NATIVE JSON)
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    initInformasiPendakian();
    initDataPendaki();
    initKonfirmasiAturan();
});

// ========================================
// SECTION 1: INFORMASI PENDAKIAN
// ========================================

function initInformasiPendakian() {
    const minusBtn = document.getElementById('minusBtn');
    const plusBtn = document.getElementById('plusBtn');
    const ticketCount = document.getElementById('ticketCount');
    const nextBtn = document.querySelector('#informasiPendakian #nextBtn');
    const formSemeru = document.getElementById('formSemeru');

    if (!minusBtn || !plusBtn || !ticketCount || !nextBtn) return;

    let count = 0;
    const MAX_TICKETS = 8;

    function updateButtons() {
        minusBtn.disabled = count === 0;
        plusBtn.disabled = count === MAX_TICKETS;
        ticketCount.textContent = count;

        if (count === 0) {
            minusBtn.style.opacity = '0.5';
            minusBtn.style.cursor = 'not-allowed';
        } else {
            minusBtn.style.opacity = '1';
            minusBtn.style.cursor = 'pointer';
        }

        if (count === MAX_TICKETS) {
            plusBtn.style.opacity = '0.5';
            plusBtn.style.cursor = 'not-allowed';
        } else {
            plusBtn.style.opacity = '1';
            plusBtn.style.cursor = 'pointer';
        }
    }

    plusBtn.addEventListener('click', () => {
        if (count < MAX_TICKETS) {
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

    formSemeru.addEventListener('submit', (e) => {
        e.preventDefault();

        if (count === 0) {
            alert("Silakan pilih minimal 1 tiket untuk melanjutkan.");
            return;
        }

        const selects = formSemeru.querySelectorAll('select');
        const dateInputs = formSemeru.querySelectorAll('input[type="date"]');

        for (let select of selects) {
            if (!select.value) {
                alert("Mohon lengkapi semua field yang diperlukan.");
                return;
            }
        }

        for (let dateInput of dateInputs) {
            if (!dateInput.value) {
                alert("Mohon lengkapi semua field yang diperlukan.");
                return;
            }
        }

        sessionStorage.setItem('jumlahTiket', count);
        sessionStorage.setItem('posIzinMasuk', selects[0].value);
        sessionStorage.setItem('posIzinKeluar', selects[1].value);
        sessionStorage.setItem('tanggalMasuk', dateInputs[0].value);
        sessionStorage.setItem('tanggalKeluar', dateInputs[1].value);

        document.getElementById('informasiPendakian').style.display = 'none';
        document.getElementById('dataPendaki').style.display = 'block';
    });

    updateButtons();
}

// ========================================
// SECTION 2: DATA PENDAKI
// ========================================

function initDataPendaki() {
    const formPemesan = document.getElementById('formPemesan');
    const btnBatal = document.getElementById('btnBatal');
    const fotoKTP = document.getElementById('fotoKTP');
    const fileName = document.getElementById('fileName');

    if (!formPemesan || !btnBatal) return;

    if (fotoKTP && fileName) {
        fotoKTP.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                fileName.textContent = file.name;
            } else {
                fileName.textContent = 'No file chosen';
            }
        });
    }

    btnBatal.addEventListener('click', () => {
        document.getElementById('dataPendaki').style.display = 'none';
        document.getElementById('informasiPendakian').style.display = 'block';
    });

    formPemesan.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = document.getElementById('nama').value.trim();
        const nik = document.getElementById('nik').value.trim();
        const noTelepon = document.getElementById('noTelepon').value.trim();
        const jenisKelamin = document.getElementById('jenisKelamin').value;
        const alamat = document.getElementById('alamat').value.trim();

        if (nik.length !== 16) {
            alert('NIK harus terdiri dari 16 digit!');
            return;
        }

        if (!fotoKTP.files[0]) {
            alert('Mohon upload foto KTP Anda!');
            return;
        }

        sessionStorage.setItem('nama', nama);
        sessionStorage.setItem('nik', nik);
        sessionStorage.setItem('noTelepon', noTelepon);
        sessionStorage.setItem('jenisKelamin', jenisKelamin);
        sessionStorage.setItem('alamat', alamat);

        document.getElementById('dataPendaki').style.display = 'none';
        document.getElementById('konfirmasiAturan').style.display = 'block';
    });
}

// ========================================
// SECTION 3: KONFIRMASI ATURAN
// ========================================

function initKonfirmasiAturan() {
    const backBtn = document.querySelector('#konfirmasiAturan #backBtn');
    const nextBtn = document.querySelector('#konfirmasiAturan #nextBtn');
    const agreeCheckbox = document.getElementById('agreeCheckbox');

    if (!backBtn || !nextBtn || !agreeCheckbox) return;

    backBtn.addEventListener('click', () => {
        document.getElementById('konfirmasiAturan').style.display = 'none';
        document.getElementById('dataPendaki').style.display = 'block';
    });

    nextBtn.addEventListener('click', async () => {
        if (!agreeCheckbox.checked) {
            alert("Harap menyetujui peraturan sebelum melanjutkan.");
            return;
        }

        sessionStorage.setItem('setujuPeraturan', 'true');

        try {
            nextBtn.disabled = true;
            nextBtn.textContent = 'Menyimpan...';

            const jumlahTiket = parseInt(sessionStorage.getItem('jumlahTiket'));
            const hargaPerTiket = 30000;

            const newTicket = {
                id: generateTicketId(),
                mountain: "Gunung Semeru",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                status: "berhasil",
                paymentStatus: "belum_dibayar",
                climbers: jumlahTiket,
                price: hargaPerTiket,
                total: jumlahTiket * hargaPerTiket,
                posMasuk: sessionStorage.getItem('posIzinMasuk'),
                posKeluar: sessionStorage.getItem('posIzinKeluar'),
                tanggalMasuk: formatDateToIndonesian(sessionStorage.getItem('tanggalMasuk')),
                tanggalKeluar: formatDateToIndonesian(sessionStorage.getItem('tanggalKeluar')),
                nama: sessionStorage.getItem('nama'),
                nik: sessionStorage.getItem('nik'),
                noTelepon: sessionStorage.getItem('noTelepon'),
                jenisKelamin: sessionStorage.getItem('jenisKelamin'),
                alamat: sessionStorage.getItem('alamat'),
                ktp: "https://mockapi.io/files/ktp_" + sessionStorage.getItem('nik') + ".jpg",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            console.log('Data tiket baru:', newTicket);

            saveTicketToLocalStorage(newTicket);

            sessionStorage.setItem('tiketId', newTicket.id);

            alert('Data berhasil disimpan! Lanjut ke tiket saya...');
            window.location.href = "tiket-saya.html";

        } catch (error) {
            console.error('Error Detail:', error);
            alert('Terjadi kesalahan: ' + error.message);

            nextBtn.disabled = false;
            nextBtn.textContent = 'Lanjut';
        }
    });
}

// ========================================
// HELPER FUNCTIONS - LOCAL STORAGE
// ========================================

function saveTicketToLocalStorage(ticket) {
    let tickets = getTicketsFromLocalStorage();
    tickets.push(ticket);
    localStorage.setItem('hikingTickets', JSON.stringify(tickets));
    console.log('✅ Tiket berhasil disimpan ke localStorage');
}

function getTicketsFromLocalStorage() {
    const stored = localStorage.getItem('hikingTickets');
    return stored ? JSON.parse(stored) : [];
}

function generateTicketId() {
    const timestamp = Date.now().toString().slice(-6);
    return timestamp;
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function formatDateToIndonesian(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
    return phoneRegex.test(phone);
}

function clearFormData() {
    sessionStorage.removeItem('jumlahTiket');
    sessionStorage.removeItem('posIzinMasuk');
    sessionStorage.removeItem('posIzinKeluar');
    sessionStorage.removeItem('tanggalMasuk');
    sessionStorage.removeItem('tanggalKeluar');
    sessionStorage.removeItem('nama');
    sessionStorage.removeItem('nik');
    sessionStorage.removeItem('noTelepon');
    sessionStorage.removeItem('jenisKelamin');
    sessionStorage.removeItem('alamat');
    sessionStorage.removeItem('setujuPeraturan');
    sessionStorage.removeItem('tiketId');
}