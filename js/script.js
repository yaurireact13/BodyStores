// Archivo JS separado y limpiado para BodyStore
const CONTACT_NUMBER = '51946431348';

const products = [
    {
        id: 1,
        name: 'Set Navideño 8 Fundas + Mantel',
    brand: 'BODYSTORE',
        description: 'Set de 8 fundas navideñas para sillas + mantel a juego, diseño festivo.',
        oldPrice: 169.00,
        currentPrice: 120.00,
        discount: 29,
        stock: 20,
        icon: '🎅',
        image: 'C:\\VENTAS\\img\\producto1.png',
        rating: 5.0,
        reviews: 50
    },
    {
        id: 2,
        name: 'Set Navideño 8 Fundas + Mantel',
    brand: 'BODYSTORE',
        description: 'Set de 8 fundas navideñas para sillas + mantel a juego, diseño festivo.',
        oldPrice: 169.00,
        currentPrice: 120.00,
        discount: 29,
        stock: 20,
        icon: '🎅',
        image: 'C:\\VENTAS\\img\\producto3.png',
        rating: 5.0,
        reviews: 50
    },
    {
        id: 3,
        name: 'Set Navideño 6 Fundas + Mantel',
    brand: 'BODYSTORE',
        description: 'Set de 6 fundas navideñas para sillas + mantel a juego, diseño festivo.',
        oldPrice: 129.00,
        currentPrice: 99.00,
        discount: 23,
        stock: 15,
        icon: '�',
        image: 'C:\\VENTAS\\img\\producto4.jpeg',
        rating: 5.0,
        reviews: 48
    },
    {
        id: 4,
        name: 'Set Navideño 8 Fundas + Mantel',
    brand: 'BODYSTORE',
        description: 'Set de 8 fundas navideñas para sillas + mantel a juego, diseño festivo.',
        oldPrice: 169.00,
        currentPrice: 120.00,
        discount: 29,
        stock: 20,
        icon: '�',
        image: 'C:\\VENTAS\\img\\producto5.jpeg',
        rating: 5.0,
        reviews: 38
    },
    {
        id: 5,
        name: 'Fundas para puertas navideñas',
    brand: 'BODYSTORE',
        description: 'Funda navideña para puertas, diseño festivo.',
        oldPrice: 49.00,
        currentPrice: 29.00,
        discount: 59,
        stock: 10,
        icon: '🎄',
        image: 'C:\\VENTAS\\img\\puerta2.jpeg',
        rating: 5.0,
        reviews: 20
    },
    {
        id: 6,
        name: 'Fundas para puertas navideñas',
    brand: 'BODYSTORE',
        description: 'Funda navideña para puertas, diseño festivo.',
        oldPrice: 49.00,
        currentPrice: 29.00,
        discount: 59,
        stock: 10,
        icon: '🎄',
        image: 'C:\\VENTAS\\img\\puerta.jpeg',
        rating: 4.9,
        reviews: 20
    },
    {
        id: 7,
        name: 'Set Navideño 6 Fundas + Mantel',
    brand: 'BODYSTORE',
        description: 'Set de 6 fundas navideñas para sillas + mantel a juego, diseño festivo.',
        oldPrice: 129.00,
        currentPrice: 99.00,
        discount: 23,
        stock: 15,
        icon: '🎅',
        image: 'C:\\VENTAS\\img\\producto6.jpeg',
        rating: 5.0,
        reviews: 55
    }
];

let currentSlide = 0;
let selectedProduct = null;
let selectedOffer = 1;
let slideInterval;

// Convert Windows file paths like "C:\\VENTAS\\img\\puerta.jpeg" into web-friendly relative paths "img/puerta.jpeg"
function getWebPath(imagePath) {
    if (!imagePath) return '';
    // normalize backslashes to slashes
    let p = String(imagePath).replace(/\\\\/g, '/').replace(/\\/g, '/');
    // if the path contains an 'img/' folder, return from that point onward
    const idx = p.indexOf('img/');
    if (idx !== -1) return p.slice(idx);
    // otherwise return the normalized path (may already be relative)
    return p;
}

function renderProducts() {
    // default: render into #productsGrid (used by index and products page)
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    renderProductsInto(grid, products);
}

function renderProductsInto(container, items) {
    container.innerHTML = items.map(product => `
        <div class="product-card">
            <div class="discount-badge">✨ ${product.discount}%</div>
            <div class="product-image" role="button" tabindex="0" onclick="showProductModal(${product.id})">
                 ${product.image ? `<img src="${getWebPath(product.image)}" alt="${product.name}" onclick="showProductModal(${product.id})" style="cursor:pointer; max-width:100%; height:auto;">` : `${product.icon}`}
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.description || ''}</p>
                <div class="price-container">
                    <span class="current-price">S/. ${product.currentPrice.toFixed(2)}</span>
                    <span class="old-price">S/. ${product.oldPrice.toFixed(2)}</span>
                </div>
                <div class="rating">
                    <span class="stars">⭐⭐⭐⭐⭐</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="shipping-badge">Envío Gratis</div>
                <div class="stock-status">${product.stock && product.stock > 0 ? `✅ In stock (${product.stock})` : '⛔ Agotado'}</div>
                <button class="order-btn" onclick="handleDirectOrder(${product.id})">Hacer Pedido</button>
            </div>
        </div>
    `).join('');
}

function handleDirectOrder(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const message = encodeURIComponent(`Hola 🎅\n\nQuiero hacer un pedido:\n${product.name}\nPrecio: S/. ${product.currentPrice.toFixed(2)}\nEnvío: Gratis`);
    window.open(`https://wa.me/${CONTACT_NUMBER}?text=${message}`, '_blank');
}

function showProductModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    if (!selectedProduct) return;
    selectedOffer = 1;
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    // Use fixed package prices for our fundas+mantel sets (product id 1 and 2)
    let offers;
    if (selectedProduct.id === 1) {
        // Set Navideño 8 Fundas + Mantel: 1 -> 120, 2 -> 210, 3 -> 290
        offers = [
            { quantity: 1, title: `Compra 1 ${selectedProduct.name}`, badge: 'Oferta!', badgeClass: 'oferta', price: 120.00, oldPrice: null },
            { quantity: 2, title: `¡Compra 2 (${selectedProduct.name})`, badge: 'Oferta Especial!', badgeClass: 'especial', price: 210.00, oldPrice: 120.00 * 2 },
            { quantity: 3, title: `¡Compra 3 (${selectedProduct.name})`, badge: 'Mega Oferta!', badgeClass: 'mega', price: 290.00, oldPrice: 120.00 * 3 }
        ];
    } else if (selectedProduct.id === 2) {
        // Set Navideño 6 Fundas + Mantel: 1 -> 99, 2 -> 168, 3 -> 259
        offers = [
            { quantity: 1, title: `Compra 1 ${selectedProduct.name}`, badge: 'Oferta!', badgeClass: 'oferta', price: 99.00, oldPrice: null },
            { quantity: 2, title: `¡Compra 2 (${selectedProduct.name})`, badge: 'Oferta Especial!', badgeClass: 'especial', price: 168.00, oldPrice: 99.00 * 2 },
            { quantity: 3, title: `¡Compra 3 (${selectedProduct.name})`, badge: 'Mega Oferta!', badgeClass: 'mega', price: 259.00, oldPrice: 99.00 * 3 }
        ];
    } else {
        offers = [
            { quantity: 1, title: `Compra 1 ${selectedProduct.name}`, badge: 'Oferta!', badgeClass: 'oferta', price: selectedProduct.currentPrice, oldPrice: null },
            { quantity: 2, title: `¡Compra 2 con 20% de descuento!`, badge: 'Oferta Especial!', badgeClass: 'especial', price: selectedProduct.currentPrice * 2 * 0.8, oldPrice: selectedProduct.currentPrice * 2 },
            { quantity: 3, title: `¡Compra 3 con un 25% de descuento!`, badge: 'Mega Oferta!', badgeClass: 'mega', price: selectedProduct.currentPrice * 3 * 0.75, oldPrice: selectedProduct.currentPrice * 3 }
        ];
    }

    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <h2 style="color: #333; margin-bottom: 0.5rem;">🚨 ¡APROVECHA NUESTRA OFERTA ESPECIAL! 🚨</h2>
            <div style="margin: 1rem 0;">
                <img src="${selectedProduct.image}" alt="${selectedProduct.name}" style="max-width: 200px; height: auto;">
            </div>
        </div>
        <div class="offer-options">
            ${offers.map((offer, index) => `
                <div class="offer-option ${index === 0 ? 'selected' : ''}" data-offer="${index}" onclick="selectOffer(${index + 1})">
                    <div class="offer-label">
                        <div class="offer-badge ${offer.badgeClass}">${offer.badge}</div>
                        <div class="offer-title">${offer.title}</div>
                        <div class="offer-price">
                            ${offer.oldPrice ? `<span class="offer-old-price">S/. ${offer.oldPrice.toFixed(2)}</span>` : ''}
                            <span class="offer-current-price">S/. ${offer.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <input type="radio" name="offer" ${index === 0 ? 'checked' : ''} style="width: 20px; height: 20px;">
                </div>
            `).join('')}
        </div>
        <div class="modal-subtotal">
            <div class="subtotal-row">
                <span>Subtotal</span>
                <span id="modalSubtotal">S/. ${offers[0].price.toFixed(2)}</span>
            </div>
            <div class="subtotal-row">
                <span>Envío</span>
                <span class="shipping-free">Gratis</span>
            </div>
            <div class="total-row">
                <span>Total</span>
                <span id="modalTotal">S/. ${offers[0].price.toFixed(2)}</span>
            </div>
        </div>
        <button class="order-btn" onclick="sendWhatsAppOrder()" style="font-size: 1.1rem; padding: 1rem;">🛍️ HACER PEDIDO</button>
    `;

    modal.classList.add('active');
}

function selectOffer(offerNum) {
    selectedOffer = offerNum;
    const offerElems = document.querySelectorAll('.offer-option');
    offerElems.forEach((el, idx) => {
        el.classList.toggle('selected', idx === (offerNum - 1));
        const input = el.querySelector('input');
        if (input) input.checked = idx === (offerNum - 1);
    });

    let prices;
    if (selectedProduct.id === 1) {
        prices = [120.00, 210.00, 290.00];
    } else if (selectedProduct.id === 2) {
        prices = [99.00, 168.00, 259.00];
    } else {
        prices = [
            selectedProduct.currentPrice,
            selectedProduct.currentPrice * 2 * 0.8,
            selectedProduct.currentPrice * 3 * 0.75
        ];
    }

    document.getElementById('modalSubtotal').textContent = `S/. ${prices[offerNum - 1].toFixed(2)}`;
    document.getElementById('modalTotal').textContent = `S/. ${prices[offerNum - 1].toFixed(2)}`;
}

function sendWhatsAppOrder() {
    if (!selectedProduct) return;
    const offerTexts = [
        `1 ${selectedProduct.name}`,
        `2 ${selectedProduct.name} (20% descuento)` ,
        `3 ${selectedProduct.name} (25% descuento)`
    ];

    let prices;
    if (selectedProduct.id === 1) {
        prices = [120.00, 210.00, 290.00];
    } else if (selectedProduct.id === 2) {
        prices = [99.00, 168.00, 259.00];
    } else {
        prices = [
            selectedProduct.currentPrice,
            selectedProduct.currentPrice * 2 * 0.8,
            selectedProduct.currentPrice * 3 * 0.75
        ];
    }

    const message = encodeURIComponent(`Hola🎅\n\nQuiero hacer un pedido:\n${offerTexts[selectedOffer - 1]}\n\nTotal: S/. ${prices[selectedOffer - 1].toFixed(2)}\nEnvío: Gratis`);
    window.open(`https://wa.me/${CONTACT_NUMBER}?text=${message}`, '_blank');
    closeModal();
}

function openCart() {
    const message = encodeURIComponent(`Hola🎅\n\nQuiero ver el catálogo de productos navideños.`);
    window.open(`https://wa.me/${CONTACT_NUMBER}?text=${message}`, '_blank');
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) modal.classList.remove('active');
}

function openWhatsAppGeneral() {
    const message = encodeURIComponent(`Hola🎅\n\nTengo una consulta sobre sus productos navideños.`);
    window.open(`https://wa.me/${CONTACT_NUMBER}?text=${message}`, '_blank');
}

function updateCountdown() {
    const now = Date.now();
    let endTime = parseInt(localStorage.getItem('countdownEndTime'), 10);

    if (!endTime || isNaN(endTime)) {
        endTime = now + (10 * 60 * 1000); // 10 minutes
        localStorage.setItem('countdownEndTime', String(endTime));
    }

    const distance = endTime - now;
    if (distance < 0) {
        const newEnd = now + (10 * 60 * 1000);
        localStorage.setItem('countdownEndTime', String(newEnd));
        return updateCountdown();
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dElem = document.getElementById('days');
    const hElem = document.getElementById('hours');
    const mElem = document.getElementById('minutes');
    const sElem = document.getElementById('seconds');
    if (dElem) dElem.textContent = String(days).padStart(2, '0');
    if (hElem) hElem.textContent = String(hours).padStart(2, '0');
    if (mElem) mElem.textContent = String(minutes).padStart(2, '0');
    if (sElem) sElem.textContent = String(seconds).padStart(2, '0');
}

// SLIDER
function initSlider() {
    const dotsContainer = document.getElementById('sliderDots');
    const slides = document.querySelectorAll('.slide');
    if (!dotsContainer || slides.length === 0) return;

    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('role', 'button');
        dot.tabIndex = 0;
        dot.onclick = () => goToSlide(index);
        dot.onkeydown = (e) => { if (e.key === 'Enter') goToSlide(index); };
        dotsContainer.appendChild(dot);
    });

    startAutoSlide();
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const slidesContainer = document.getElementById('slides');
    const dots = document.querySelectorAll('.dot');
    if (!slidesContainer) return;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
    resetAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(() => changeSlide(1), 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Toggle responsive navigation (shows/hides mobile menu)
function toggleNav() {
    const btn = document.querySelector('.nav-toggle');
    if (btn) {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
    }
    document.body.classList.toggle('nav-open');
}

// Close nav when clicking a nav link
document.addEventListener('click', (e) => {
    const link = e.target.closest && e.target.closest('.main-nav a');
    if (link) {
        document.body.classList.remove('nav-open');
        const btn = document.querySelector('.nav-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }
});

// Close nav with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.body.classList.remove('nav-open');
        const btn = document.querySelector('.nav-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }
});

function scrollToProducts() {
    const elem = document.getElementById('productos');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initSlider();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    // close modal when clicking outside
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }
    // keyboard: Esc close modal, arrows for slider
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
    });

    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const messageEl = document.getElementById('newsletterMessage');
            if (!emailInput) return;
            const email = emailInput.value.trim();
            // simple email validation
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!valid) {
                if (messageEl) messageEl.textContent = 'Por favor ingresa un correo válido.';
                emailInput.focus();
                return;
            }

            // Simular suscripción: aquí podrías llamar a una API
            if (messageEl) messageEl.textContent = '¡Gracias! Te hemos enviado un correo de confirmación.';
            emailInput.value = '';
            // pequeño timeout para limpiar el mensaje
            setTimeout(() => { if (messageEl) messageEl.textContent = ''; }, 5000);
        });
    }

    // Search & filter on products page
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const productsContainer = document.getElementById('productsGrid');
    function applyFilters() {
        if (!productsContainer) return;
        const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const filter = filterSelect ? filterSelect.value : 'all';
        let list = products.slice();
        if (q) {
            list = list.filter(p => p.name.toLowerCase().includes(q) || (p.brand || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
        }
        if (filter === 'discount') {
            list = list.filter(p => p.discount && p.discount > 0);
        } else if (filter === 'stock') {
            list = list.filter(p => p.stock && p.stock > 0);
        }
        renderProductsInto(productsContainer, list);
    }

    if (searchInput) searchInput.addEventListener('input', () => applyFilters());
    if (filterSelect) filterSelect.addEventListener('change', () => applyFilters());
});
