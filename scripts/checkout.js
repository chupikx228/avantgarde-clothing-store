const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const formatPrice = (price) => {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const renderCartItems = () => {
    const cart = getCart();
    const orderItemsDesktop = document.getElementById('co-order-items');
    const orderItemsMobile = document.getElementById('co-order-items-mobile');

    if (!cart || cart.length === 0) {
        const emptyMessage = '<p>Your cart is empty</p>';
        if (orderItemsDesktop) orderItemsDesktop.innerHTML = emptyMessage;
        if (orderItemsMobile) orderItemsMobile.innerHTML = emptyMessage;
        updateTotals(0);
        return;
    }

    let html = '';
    let subtotal = 0;

    cart.forEach(cartItem => {
        const product = window.products?.find(p => p.id === cartItem.id);

        if (product) {
            const itemTotal = product.price * cartItem.quantity;
            subtotal += itemTotal;

            html += `
                <div class="co-order-item">
                    <div class="co-order-item__image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="co-order-item__badge">${cartItem.quantity}</div>
                    <div class="co-order-item__details">
                        <h4 class="co-order-item__title">${product.title}</h4>
                        <p class="co-order-item__variant">${product.shade} / ${cartItem.size}</p>
                    </div>
                    <div class="co-order-item__price">${formatPrice(itemTotal)}</div>
                </div>
            `;
        }
    });

    if (orderItemsDesktop) orderItemsDesktop.innerHTML = html;
    if (orderItemsMobile) orderItemsMobile.innerHTML = html;
    updateTotals(subtotal);
};

const updateTotals = (subtotal) => {
    const formattedSubtotal = formatPrice(subtotal);

    const desktopSubtotal = document.getElementById('co-subtotal');
    const desktopTotal = document.getElementById('co-total');
    if (desktopSubtotal) desktopSubtotal.textContent = formattedSubtotal;
    if (desktopTotal) desktopTotal.textContent = formattedSubtotal;

    const mobileSubtotal = document.querySelector('.co-subtotal-mobile');
    const mobileTotal = document.querySelector('.co-total-mobile');
    const mobilePrice = document.getElementById('co-mobile-total');

    if (mobileSubtotal) mobileSubtotal.textContent = formattedSubtotal;
    if (mobileTotal) mobileTotal.textContent = formattedSubtotal;
    if (mobilePrice) mobilePrice.textContent = formattedSubtotal;
};

const toggleOrderSummary = () => {
    const sidebar = document.querySelector('.co-sidebar--mobile');
    const arrow = document.querySelector('.co-order-summary__text');

    sidebar.classList.toggle('co-sidebar--open');

    if (sidebar.classList.contains('co-sidebar--open')) {
        arrow.textContent = 'Order summary ▲';
    } else {
        arrow.textContent = 'Order summary ▼';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();

    const orderSummary = document.querySelector('.co-order-summary');
    if (orderSummary) {
        orderSummary.addEventListener('click', toggleOrderSummary);
    }
});

window.addEventListener('storage', (e) => {
    if (e.key === 'cart') {
        renderCartItems();
    }
});