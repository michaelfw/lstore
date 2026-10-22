const telegramAdmin = 'silentobserve'; 
// Pricelist Data dari L'STORE
const pricelistData = [
    // Standard Packages
    { name: "5 Diamond", price: "Rp1.700" },
    { name: "10 Diamond", price: "Rp3.400" },
    { name: "12 Diamond", price: "Rp3.800" },
    { name: "19 Diamond", price: "Rp6.000" },
    { name: "28 Diamond", price: "Rp8.800" },
    { name: "38 Diamond", price: "Rp12.000" },
    { name: "44 Diamond", price: "Rp13.000" },
    { name: "59 Diamond", price: "Rp17.500" },
    { name: "85 Diamond", price: "Rp25.500" },
    { name: "100 Diamond", price: "Rp30.500" },
    { name: "113 Diamond", price: "Rp34.000" },
    { name: "170 Diamond", price: "Rp50.500" },
    { name: "229 Diamond", price: "Rp68.000" },
    { name: "255 Diamond", price: "Rp75.500" },
    { name: "296 Diamond", price: "Rp90.000" },
    { name: "408 Diamond", price: "Rp123.000" },
    { name: "568 Diamond", price: "Rp168.000" },
    { name: "601 Diamond", price: "Rp178.000" },
    { name: "750 Diamond", price: "Rp222.000" },
    { name: "875 Diamond", price: "Rp257.500" },
    { name: "1045 Diamond", price: "Rp307.000" },
    { name: "1221 Diamond", price: "Rp360.000" },
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

    card.innerHTML = `
        <div class="check-mark"><i class="fa-solid fa-check"></i></div>
        <i class="${iconClass} dm-icon"></i>
        <div class="item-title">${item.name}</div>
        <div class="item-price">${item.price}</div>
    `;

    container.appendChild(card);
    });
}

function selectItem(element, item) {
    document.querySelectorAll('.item-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedItem = item;
}

function selectPayment(element, method) {
    document.querySelectorAll('.payment-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedPayment = method;
}

// Submit Order to Telegram
function submitOrder() {
    const userId = document.getElementById('userId').value.trim();
    const serverId = document.getElementById('serverId').value.trim();

    if (!userId || !serverId) {
    alert('Mohon isi User ID dan Server ID Anda.');
    return;
    }

    if (!selectedItem) {
    alert('Mohon pilih nominal Diamond terlebih dahulu.');
    return;
    }

    if (!selectedPayment) {
    alert('Mohon pilih metode pembayaran.');
    return;
    }

    // Format Message
    const message = `Halo Admin L'STORE, saya ingin memesan:\n\n` +
    `🎮 *Game:* Mobile Legends (Paket Fast)\n` +
    `🆔 *User ID:* ${userId}\n` +
    `🌐 *Zone ID / Server:* ${serverId}\n` +
    `💎 *Paket:* ${selectedItem.name}\n` +
    `💰 *Harga:* ${selectedItem.price}\n` +
    `💳 *Metode Pembayaran:* ${selectedPayment}\n\n` +
    `Mohon diproses, terima kasih!`;

    // Redirect to Telegram
    const encodedMsg = encodeURIComponent(message);
    const tgUrl = `https://t.me/${telegramAdmin}?text=${encodedMsg}`;
    
    window.open(tgUrl, '_blank');
}

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    renderItems();
});