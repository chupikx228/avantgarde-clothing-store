(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));
    const product = window.products.find(p => p.id === productId);

    window.currentProduct = product;

    if (!product) {
        document.body.innerHTML = "Product not found";
        return;
    }

    const pageTitleEl = document.getElementById("page-title");
    const titleEl = document.getElementById("title");
    const shadeEl = document.getElementById("shade");
    const imageEl = document.getElementById("image");
    const priceBtn = document.getElementById("price");
    const priceDesktopBtn = document.getElementById("price-desktop");
    const descriptionEl = document.getElementById("description");
    const descriptionDesktopEl = document.getElementById("description-desktop");
    const sizeButtons = document.querySelectorAll('.product__buttons-size > button:not(#price-desktop)');

    pageTitleEl.textContent = product.title;
    titleEl.textContent = product.title;
    shadeEl.textContent = product.shade;
    imageEl.src = product.image;
    priceBtn.textContent = `ADD TO CART — $${product.price}`;
    priceDesktopBtn.textContent = `ADD TO CART — $${product.price}`;
    priceBtn.dataset.id = product.id;
    priceDesktopBtn.dataset.id = product.id;
    descriptionEl.textContent = product.description;
    descriptionDesktopEl.textContent = product.description;

    if (product.type === 'Clothes') {
        sizeButtons.forEach(button => button.style.display = '');
    } else if (product.type === 'Shoes') {
        const shoeSizes = ['40', '41', '42', '43', '44', '45'];
        sizeButtons.forEach((button, index) => {
            if (shoeSizes[index]) {
                button.textContent = shoeSizes[index];
                button.style.display = '';
            } else {
                button.style.display = 'none';
            }
        });
    } else {
        sizeButtons.forEach((button, index) => {
            if (index === 0) {
                button.textContent = 'ONE SIZE';
                button.classList.add('selected');
                button.style.display = '';
                button.style.width = '100px';
            } else {
                button.style.display = 'none';
            }
        });
    }

    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    if (typeof window.displayRelatedItems === 'function') {
        window.displayRelatedItems();
    }
})();
