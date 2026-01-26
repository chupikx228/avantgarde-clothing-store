(() => {
    const addToCartBtn = document.getElementById('price');
    const addToCartBtnDesktop = document.getElementById('price-desktop');
    const sizeButtonsContainer = document.querySelector('.product__buttons-size');
    let selectedSize = null;

    const sizeButtons = Array.from(sizeButtonsContainer?.children || [])
        .filter(el => el.tagName === 'BUTTON' && !el.id);

    const preselectedButton = sizeButtons.find(btn => btn.classList.contains('selected'));
    if (preselectedButton) {
        selectedSize = preselectedButton.textContent.trim();
        console.log('Preselected size:', selectedSize);
    }

    sizeButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            sizeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = btn.textContent.trim();
            console.log('Selected size:', selectedSize);
        });
    });

    const addToCart = e => {
        e.preventDefault();
        const product = window.currentProduct;

        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        if (!product) {
            console.error('Product not found!');
            return;
        }

        const cart = getCart();
        const existingItem = cart.find(item => item.id === product.id && item.size === selectedSize);

        if (existingItem) {
            existingItem.quantity += 1;
            console.log('Quantity increased:', selectedSize);
        } else {
            cart.push({ id: product.id, size: selectedSize, quantity: 1 });
            console.log('Added to cart:', selectedSize);
        }

        saveCart(cart);
        openCart();
    };

    if (addToCartBtn) addToCartBtn.addEventListener('click', addToCart);
    if (addToCartBtnDesktop) addToCartBtnDesktop.addEventListener('click', addToCart);
})();
