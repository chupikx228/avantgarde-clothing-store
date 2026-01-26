const relatedItems = (products, currentProductId) => {
    const currentProduct = products.find(p => p.id === currentProductId);
    const selectedGender = currentProduct ? currentProduct.gender : "FEMME";

    const filtered = products.filter(product => {
        return product.gender === selectedGender && product.id !== currentProductId;
    });

    return filtered;
};

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

window.displayRelatedItems = () => {

    const container = document.getElementById("related-items");

    if (!container) {
        console.error('Container #related-items not found');
        return;
    }

    if (typeof products === 'undefined') {
        console.error('Products array is not defined!');
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const currentProductId = Number(params.get("id"));

    console.log('Current product ID:', currentProductId);

    if (!currentProductId) {
        console.error('Current product ID not found in URL');
        return;
    }

    const related = relatedItems(products, currentProductId);

    const shuffledRelated = shuffleArray(related);

    const existingCards = container.querySelectorAll('.product-card');

    existingCards.forEach(card => card.remove());

    const limitedRelated = shuffledRelated.slice(0, 4);

    limitedRelated.forEach((item, index) => {

        const card = document.createElement("div");
        card.className = "product-card";

        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            window.location.href = `product.html?id=${item.id}`;
        });

        const img = document.createElement("img");
        img.className = "related-product-image";
        img.src = item.image;
        img.alt = item.title;

        const info = document.createElement("div");
        info.className = "product-card-info";

        const title = document.createElement("div");
        title.className = "product-card-title";
        title.textContent = item.title;

        const shade = document.createElement("div");
        shade.className = "product-card-shade";
        shade.textContent = item.shade;

        const price = document.createElement("div");
        price.className = "product-card-price";
        price.textContent = `$${item.price}`;

        info.appendChild(title);
        info.appendChild(shade);
        info.appendChild(price);

        card.appendChild(img);
        card.appendChild(info);
        container.appendChild(card);

    });

};

const initRelatedItems = () => {
    console.log('initRelatedItems called');
    console.log('products defined?', typeof products !== 'undefined');
    console.log('container exists?', !!document.getElementById('related-items'));

    if (typeof products !== 'undefined' && document.getElementById('related-items')) {
        console.log('Calling displayRelatedItems...');
        displayRelatedItems();
    } else {
        console.log('Retrying in 100ms...');
        setTimeout(initRelatedItems, 100);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRelatedItems);
} else {
    initRelatedItems();
}