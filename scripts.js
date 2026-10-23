const telegramAdmin = 'silentobserve'; 
// Pricelist Data dari L'STORE
const pricelistData = [
    // Standard Packages
    { name: "5 Diamond", bonus: "5+0", price: "Rp1.700" },
    { name: "10 Diamond", bonus: "10+0", price: "Rp3.400" },
    { name: "12 Diamond", bonus: "11+1", price: "Rp3.800" },
    { name: "19 Diamond", bonus: "17+2", price: "Rp6.000" },
    { name: "28 Diamond", bonus: "25+3", price: "Rp8.800" },
    { name: "38 Diamond", bonus: "34+4", price: "Rp12.000" },
    { name: "44 Diamond", bonus: "40+4", price: "Rp13.000" },
    { name: "59 Diamond", bonus: "53+6", price: "Rp17.500" },
    { name: "85 Diamond", bonus: "77+8", price: "Rp25.500" },
    { name: "100 Diamond", bonus: "92+8", price: "Rp30.500" },
    { name: "113 Diamond", bonus: "102+11", price: "Rp34.000" },
    { name: "170 Diamond", bonus: "154+16", price: "Rp50.500" },
    { name: "229 Diamond", bonus: "117+12", price: "Rp68.000" },
    { name: "255 Diamond", bonus: "231+24", price: "Rp75.500" },
    { name: "296 Diamond", bonus: "256+40", price: "Rp90.000" },
    { name: "408 Diamond", bonus: "367+41", price: "Rp123.000" },
    { name: "568 Diamond", bonus: "503+65", price: "Rp168.000" },
    { name: "601 Diamond", bonus: "533+68", price: "Rp178.000" },
    { name: "750 Diamond", bonus: "668+82", price: "Rp222.000" },
    { name: "875 Diamond", bonus: "774+101", price: "Rp257.500" },
    { name: "1045 Diamond", bonus: "928+117", price: "Rp307.000" },
    { name: "1221 Diamond", bonus: "1083+138", price: "Rp360.000" },
    { name: "1544 Diamond", price: "Rp458.000" },
    { name: "2010 Diamond", price: "Rp560.000" },
    { name: "2503 Diamond", price: "Rp705.000" },
    { name: "3055 Diamond", price: "Rp865.000" },
    { name: "3554 Diamond", price: "Rp1.015.000" },
    { name: "4020 Diamond", price: "Rp1.115.000" },
    { name: "4588 Diamond", price: "Rp1.280.000" },
    { name: "4830 Diamond", price: "Rp1.355.000" },
    { name: "5000 Diamond", price: "Rp1.405.000" },
    { name: "6001 Diamond", price: "Rp1.700.000" },
    { name: "7010 Diamond", price: "Rp1.960.000" },
    { name: "8011 Diamond", price: "Rp2.257.000" },
    { name: "9660 Diamond", price: "Rp2.700.000" },
    { name: "10068 Diamond", price: "Rp2.820.000" },
    
    // Membership & Pass Cards
    { category: "Membership & Passes", name: "Weekly Diamond Pass", price: "Rp31.500", isSpecial: true },
    { name: "Starlight Card", price: "Rp50.000", isSpecial: true },

    // First Time Recharge 2025-2026
    { category: "First Time Recharge (2025-2026)", name: "50+50 Diamond", price: "Rp16.500" },
    { name: "150+150 Diamond", price: "Rp48.500" },
    { name: "250+250 Diamond", price: "Rp82.000" },
    { name: "500+500 Diamond", price: "Rp165.000" }
];

let selectedItem = null;
let selectedPayment = null;

// Render items to HTML
function renderItems() {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';

    pricelistData.forEach((item, index) => {
    if (item.category) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-divider';
        categoryDiv.innerText = item.category;
        container.appendChild(categoryDiv);
    }

    const card = document.createElement('div');
    card.className = 'item-card';
    card.onclick = () => selectItem(card, item);

    const iconClass = item.isSpecial ? 'fa-solid fa-crown' : 'fa-solid fa-gem';

    // Cek apakah item memiliki keterangan bonus/sub-teks
    const bonusHtml = item.bonus ? `<div class="item-bonus" style="font-size: 0.72rem; color: #64748b; font-weight: 600; background: #e0f2fe; padding: 2px 6px; border-radius: 6px; margin-top: 2px;">${item.bonus}</div>` : '';

    card.innerHTML = `
        <div class="check-mark"><i class="fa-solid fa-check"></i></div>
        <i class="${iconClass} dm-icon"></i>
        <div class="item-title">${item.name}</div>
        ${bonusHtml}
        <div class="item-price">${item.price}</div>
    `;

    container.appendChild(card);
    });
}

function selectItem(element, item) {
    document.querySelectorAll('.item-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedItem = item;
    updateSubmitButton();
}

function selectPayment(element, method) {
    document.querySelectorAll('.payment-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedPayment = method;
    updateSubmitButton();
}

function updateSubmitButton() {
  const btnText = document.getElementById('submitBtnText');
  if (selectedItem && selectedPayment) {
    btnText.innerHTML = `Order ${selectedItem.name} (${selectedItem.price}) via Telegram`;
  } else if (selectedItem) {
    btnText.innerHTML = `Lanjut Pilih Metode Pembayaran`;
  } else if (selectedPayment) {
    btnText.innerHTML = `Lanjut Pilih Pesanan`;
  } else {
    btnText.innerHTML = `Order via Telegram`;
  }
}

// Fungsi yang dipanggil saat tombol "Lanjut" diklik oleh customer
function scrollToPayment() {
  const paymentSec = document.getElementById('paymentSection');
  if (paymentSec) {
    paymentSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Submit Order to Telegram
function submitOrder() {
    const userId = document.getElementById('userId').value.trim();
    const serverId = document.getElementById('serverId').value.trim();

    if (!userId || !serverId) {
        showCustomAlert('Data Belum Lengkap', 'Mohon isi User ID dan Zone ID / Server akun Mobile Legends anda terlebih dahulu.');
        return;
    }

    if (!selectedItem) {
        showCustomAlert('Pesanan Belum Dipilih', 'Silakan pilih salah satu nominal Diamond, Weekly Pass, atau Starlight yang ingin anda beli.');
        return;
    }

    if (!selectedPayment) {
        scrollToPayment();
        return;
    }

    // Format Message
    const packageInfo = selectedItem.bonus ? `${selectedItem.name} (${selectedItem.bonus})` : selectedItem.name;
  
    const message = `Halo Admin L'STORE, saya ingin memesan:\n\n` +
    `**Game:** Mobile Legends (Paket Fast)\n` +
    `**User ID:** ${userId}\n` +
    `**Zone ID / Server:** ${serverId}\n` +
    `**Paket:** ${packageInfo}\n` +
    `**Harga:** ${selectedItem.price}\n` +
    `**Metode Pembayaran:** ${selectedPayment}\n\n` +
    `Mohon diproses, terima kasih!`;

    // Redirect to Telegram
    const encodedMsg = encodeURIComponent(message);
    const tgUrl = `https://t.me/${telegramAdmin}?text=${encodedMsg}`;
    
    window.open(tgUrl, '_blank');
}

// Fungsi untuk memunculkan pop-up yang cantik
function showCustomAlert(title, message) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalMessage').innerText = message;
  document.getElementById('customModal').style.display = 'flex';
}

// Fungsi untuk menutup pop-up
function closeCustomModal() {
  document.getElementById('customModal').style.display = 'none';
}

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    renderItems();
});
