const cartBtn = document.getElementById('cart');
const cart = document.querySelector('.cart');
const overlay = document.querySelector('.cart-overlay');
const closeBtn = document.querySelector('.cart-close');
const cartItemsEl = document.querySelector('.cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');
const cartCountSidebarEl = document.getElementById('cart-count-sidebar');
const mainPageCheckoutBtn = document.getElementById('main-page-checkout');
const checkoutBtn = document.getElementById('checkout');

function getCart() {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
}

function saveCart(cartData) {
    localStorage.setItem('cart', JSON.stringify(cartData));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }
    if (cartCountSidebarEl) {
        cartCountSidebarEl.textContent = totalItems;
    }
}

updateCartCount();

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
        window.location.href = `checkout.html`;
    });
}

if (mainPageCheckoutBtn) {
    mainPageCheckoutBtn.addEventListener('click', (e) => {
        window.location.href = `pages/checkout.html`;
    });
}

if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        openCart();
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeCart);
}

if (overlay) {
    overlay.addEventListener('click', closeCart);
}

function openCart() {
    if (cart) cart.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCart();
}

function closeCart() {
    if (cart) cart.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = 'visible';
}

function renderCart() {
    if (!cartItemsEl) return;

    if (typeof products === 'undefined') {
        console.error('Products array is not defined!');
        return;
    }

    const cartData = getCart();
    cartItemsEl.innerHTML = '';

    if (cartData.length === 0) {
        cartItemsEl.innerHTML = '<p style="text-align: center; padding: 20px;">Cart is Empty</p>';
        if (cartTotalEl) cartTotalEl.textContent = '0';
        return;
    }

    let total = 0;

    cartData.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        total += product.price * item.quantity;

        const sizeText = item.size === 'ONE SIZE' ? item.size : `SIZE ${item.size}`;

        cartItemsEl.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="">
                <div class="cart-item-title">${product.title}</div>
                <div class="cart-item-meta">COLOR ${product.shade}</div>
                <div class="cart-item-meta">${sizeText}</div>
                <div class="cart-item-price">$${product.price}</div>

                <div class="cart-qty">
                    <button class="qty-minus" data-id="${item.id}" data-size="${item.size}">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-plus" data-id="${item.id}" data-size="${item.size}">+</button>
                </div>
            </div>
        `;
    });

    if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);

    initQtyButtons();
}

function initQtyButtons() {
    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => updateQty(btn, 1));
    });

    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', () => updateQty(btn, -1));
    });
}

function updateQty(button, delta) {
    const id = Number(button.dataset.id);
    const size = button.dataset.size;

    const cartData = getCart();
    const item = cartData.find(i => i.id === id && i.size === size);

    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        const index = cartData.indexOf(item);
        cartData.splice(index, 1);
    }

    saveCart(cartData);
    renderCart();
}

window.openCart = openCart;
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = function(productId, size, quantity = 1) {
    const cartData = getCart();
    const existingItem = cartData.find(item => item.id === productId && item.size === size);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartData.push({ id: productId, size: size, quantity: quantity });
    }

    saveCart(cartData);
};