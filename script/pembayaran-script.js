// ========================================
// PEMBAYARAN SCRIPT - NATIVE JSON VERSION
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    console.log('🚀 Initializing Pembayaran page...');
    loadTicketDetail();
});

// ========================================
// HELPER FUNCTIONS - LOCAL STORAGE
// ========================================

function getTicketsFromLocalStorage() {
    const stored = localStorage.getItem('hikingTickets');
    return stored ? JSON.parse(stored) : [];
}

function saveTicketsToLocalStorage(tickets) {
    localStorage.setItem('hikingTickets', JSON.stringify(tickets));
}

function getTicketById(ticketId) {
    const tickets = getTicketsFromLocalStorage();
    return tickets.find(t => t.id === ticketId);
}

function updateTicketInStorage(ticketId, updates) {
    const tickets = getTicketsFromLocalStorage();
    const index = tickets.findIndex(t => t.id === ticketId);

    if (index !== -1) {
        tickets[index] = { ...tickets[index], ...updates, updatedAt: new Date().toISOString() };
        saveTicketsToLocalStorage(tickets);
        return tickets[index];
    }

    return null;
}

// ========================================
// LOAD TICKET DETAIL
// ========================================

async function loadTicketDetail() {
    const ticketId = sessionStorage.getItem('paymentTicketId');

    if (!ticketId) {
        showError('Tiket tidak ditemukan. Silakan kembali ke halaman Tiket Saya.');
        return;
    }

    try {
        showLoading();

        const ticket = getTicketById(ticketId);

        if (!ticket) {
            throw new Error('Tiket tidak ditemukan');
        }

        console.log('✅ Ticket loaded:', ticket);

        renderPaymentPage(ticket);

    } catch (error) {
        console.error('❌ Error loading ticket:', error);
        showError('Gagal memuat data tiket. Silakan coba lagi.');
    }
}

// ========================================
// RENDER PAYMENT PAGE
// ========================================

function renderPaymentPage(ticket) {
    const container = document.getElementById('paymentContainer');

    container.innerHTML = `
        <div class="payment-wrapper">
            <!-- Ticket Summary -->
            <div class="ticket-summary">
                <h2 class="section-title">Detail Tiket</h2>
                
                <div class="ticket-header">
                    <img src="${ticket.image || 'assets/gunung-default.jpg'}" 
                         alt="${ticket.mountain}"
                         onerror="this.src='assets/gunung-default.jpg'">
                    <div>
                        <h3>${ticket.mountain}</h3>
                        <p class="ticket-id">ID: ${ticket.id}</p>
                        <span class="status-badge belum-bayar">Belum Dibayar</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 style="display: flex; align-items: center;"> <img src="assets/iconCalendar.svg" alt="" style="margin-right: 8px;">Jadwal Pendakian</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="label">Pos Masuk:</span>
                            <span class="value">${ticket.posMasuk}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Tanggal Masuk:</span>
                            <span class="value">${ticket.tanggalMasuk}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Pos Keluar:</span>
                            <span class="value">${ticket.posKeluar}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Tanggal Keluar:</span>
                            <span class="value">${ticket.tanggalKeluar}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 style="display: flex; align-items: center;"> <img src="assets/iconUser.svg" alt="" style="margin-right: 8px;">Data Pemesan</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span class="label">Nama:</span>
                            <span class="value">${ticket.nama}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">No. Telepon:</span>
                            <span class="value">${ticket.noTelepon}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Jenis Kelamin:</span>
                            <span class="value">${ticket.jenisKelamin}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Alamat:</span>
                            <span class="value">${ticket.alamat}</span>
                        </div>
                    </div>
                </div>

                <div class="price-summary">
                    <div class="price-row">
                        <span>Jumlah Pendaki:</span>
                        <span>${ticket.climbers} Orang</span>
                    </div>
                    <div class="price-row">
                        <span>Harga per Orang:</span>
                        <span>${formatPrice(ticket.price)}</span>
                    </div>
                    <div class="price-row total">
                        <span>Total Pembayaran:</span>
                        <span class="total-price">${formatPrice(ticket.total)}</span>
                    </div>
                </div>
            </div>

            <!-- Payment Method -->
            <div class="payment-method">
                <h2 class="section-title">Metode Pembayaran</h2>
                
                <div class="payment-option active">
                    <div class="option-header">
                        <input type="radio" id="qris" name="payment" value="qris" checked>
                        <label for="qris">
                            <strong>QRIS</strong>
                            <span class="option-desc">Bayar menggunakan QRIS dari berbagai e-wallet</span>
                        </label>
                    </div>
                </div>

                <div class="qris-section">
                    <p class="qris-instruction">Scan kode QR di bawah ini menggunakan aplikasi e-wallet Anda:</p>
                    
                    <div class="qris-box">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?data=TIKETHIKEPASS${ticket.id}TOTAL${ticket.total}&size=250x250&margin=10" 
                             alt="QRIS Code"
                             class="qris-image">
                        <p class="qris-label">Scan QRIS untuk membayar</p>
                    </div>

                    <div class="payment-info">
                        <div class="info-item">
                            <span class="info-icon">💳</span>
                            <div>
                                <strong>Mendukung Semua E-Wallet</strong>
                                <p>GoPay, OVO, Dana, LinkAja, ShopeePay, dll</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">⏱️</span>
                            <div>
                                <strong>Pembayaran Instan</strong>
                                <p>Konfirmasi otomatis setelah pembayaran berhasil</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <span class="info-icon">🔒</span>
                            <div>
                                <strong>Aman & Terpercaya</strong>
                                <p>Transaksi dilindungi enkripsi end-to-end</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="payment-actions">
                    <button class="btn-back" onclick="handleBack()">
                        ← Kembali
                    </button>
                    <button class="btn-confirm" onclick="handleConfirmPayment('${ticket.id}')">
                        Konfirmasi Pembayaran
                    </button>
                </div>

                <p class="payment-note">
                    <strong>Catatan:</strong> Setelah melakukan pembayaran, klik tombol "Konfirmasi Pembayaran" 
                    untuk memverifikasi transaksi Anda. Status tiket akan berubah menjadi "Lunas" setelah pembayaran dikonfirmasi.
                </p>
            </div>
        </div>
    `;
}

// ========================================
// HANDLE PAYMENT CONFIRMATION
// ========================================

async function handleConfirmPayment(ticketId) {
    const confirmBtn = document.querySelector('.btn-confirm');

    if (!confirm('Apakah Anda sudah melakukan pembayaran melalui QRIS?')) {
        return;
    }

    try {
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'Memproses...';

        const updatedTicket = updateTicketInStorage(ticketId, {
            paymentStatus: 'lunas'
        });

        if (!updatedTicket) {
            throw new Error('Gagal mengupdate status pembayaran');
        }

        console.log('✅ Payment confirmed for ticket:', ticketId);

        showSuccessModal();

    } catch (error) {
        console.error('❌ Error confirming payment:', error);
        alert('Gagal mengkonfirmasi pembayaran. Silakan coba lagi.');

        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Konfirmasi Pembayaran';
    }
}

// ========================================
// SHOW SUCCESS MODAL
// ========================================

function showSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'success-modal-overlay';
    modal.innerHTML = `
        <div class="success-modal">
            <div class="success-icon">✓</div>
            <h2>Pembayaran Berhasil!</h2>
            <p>Tiket Anda telah dibayar dan dikonfirmasi.</p>
            <p class="success-note">Anda dapat melihat tiket Anda di halaman "Tiket Saya"</p>
            <button class="btn-success" onclick="redirectToTickets()">
                Lihat Tiket Saya
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        redirectToTickets();
    }, 5000);
}

// ========================================
// NAVIGATION HANDLERS
// ========================================

function handleBack() {
    if (confirm('Yakin ingin kembali? Pembayaran belum selesai.')) {
        window.location.href = 'tiket-saya.html';
    }
}

function redirectToTickets() {
    sessionStorage.removeItem('paymentTicketId');
    window.location.href = 'tiket-saya.html';
}

// ========================================
// LOADING & ERROR STATES
// ========================================

function showLoading() {
    const container = document.getElementById('paymentContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 48px; margin-bottom: 20px;">⏳</div>
            <p style="font-size: 16px; color: #666;">Memuat data tiket...</p>
        </div>
    `;
}

function showError(message) {
    const container = document.getElementById('paymentContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 48px; margin-bottom: 20px; color: #cf1322;">❌</div>
            <p style="font-size: 16px; margin-bottom: 20px; color: #666;">${message}</p>
            <button onclick="window.location.href='tiket-saya.html'" 
                    style="padding: 12px 24px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600;">
                Kembali ke Tiket Saya
            </button>
        </div>
    `;
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

console.log('%c💳 Pembayaran Page - LOADED (Native JSON)', 'font-size: 16px; font-weight: bold; color: #0c665c;');
console.log('%cData Source: localStorage', 'font-weight: bold;');