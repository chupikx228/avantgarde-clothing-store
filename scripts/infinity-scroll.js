const container = document.getElementById("products");

const ITEMS_PER_PAGE = 6;
let currentIndex = 0;
let isLoading = false;
let isResetting = false;
let currentFilteredProducts = [];

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .catalog__item {
        animation: fadeInUp 0.6s ease-out;
        animation-fill-mode: both;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    #loader {
        text-align: center;
        padding: 40px 20px;
        color: #666;
        font-size: 14px;
    }
    
    #loader::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid #ddd;
        border-top-color: #666;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-right: 10px;
        vertical-align: middle;
    }
`;
document.head.appendChild(style);

const loader = document.createElement("div");
loader.id = "loader";
loader.textContent = "Loading...";
container.after(loader);

const getFilteredProducts = () => {
    let filtered = [...products];

    if (window.currentGender && window.currentCategory) {
        filtered = filtered.filter(product =>
            product.gender === window.currentGender && product.category === window.currentCategory
        );
    } else if (window.currentGender) {
        filtered = filtered.filter(product => product.gender === window.currentGender);
    } else if (window.currentCategory) {
        filtered = filtered.filter(product => product.category === window.currentCategory);
    }

    return filtered;
};

const loadProducts = () => {
    currentFilteredProducts = getFilteredProducts();

    if (currentFilteredProducts.length === 0 || currentIndex >= currentFilteredProducts.length) {
        const loaderElement = document.getElementById("loader");
        if (loaderElement) loaderElement.style.display = 'none';
        return;
    }

    if (isLoading) return;

    isLoading = true;

    const endIndex = Math.min(currentIndex + ITEMS_PER_PAGE, currentFilteredProducts.length);
    const productsToLoad = currentFilteredProducts.slice(currentIndex, endIndex);

    setTimeout(() => {
        productsToLoad.forEach((product, index) => {
            const div = document.createElement("div");
            div.className = "catalog__item";
            div.style.animationDelay = `${index * 0.05}s`;

            div.innerHTML = `
                <img src="${product.image}">
                <p>${product.title}</p>
                <span> ${product.shade} <br> $${product.price}.00 </span>
            `;

            div.onclick = () => {
                window.location.href = `pages/product.html?id=${product.id}`;
            };

            container.appendChild(div);
        });

        currentIndex = endIndex;
        isLoading = false;

        const loaderElement = document.getElementById("loader");
        if (currentIndex >= currentFilteredProducts.length) {
            if (loaderElement) loaderElement.style.display = 'none';
        } else {
            if (loaderElement) loaderElement.style.display = 'block';
            setTimeout(checkScroll, 100);
        }
    }, 200);
};

window.resetInfiniteScroll = () => {
    if (isResetting) {
        console.log('Reset already in progress, skipping...');
        return;
    }

    isResetting = true;
    console.log('Resetting infinite scroll');

    currentIndex = 0;
    isLoading = false;

    container.innerHTML = "";

    const loaderElement = document.getElementById("loader");
    if (!loaderElement) {
        container.after(loader);
    } else {
        loaderElement.style.display = 'block';
    }

    currentFilteredProducts = getFilteredProducts();
    console.log('Filtered products count:', currentFilteredProducts.length);

    if (currentFilteredProducts.length === 0) {
        const loaderElement = document.getElementById("loader");
        if (loaderElement) loaderElement.style.display = 'none';
        isResetting = false;
    } else {
        loadProducts();

        setTimeout(() => {
            isResetting = false;
        }, 400);
    }
};

const checkScroll = () => {
    if (isLoading || isResetting) return;

    if (currentIndex >= currentFilteredProducts.length) return;

    const loaderElement = document.getElementById("loader");
    if (!loaderElement) return;

    const loaderRect = loaderElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (loaderRect.top <= windowHeight + 400) {
        loadProducts();
    }
};

window.addEventListener('scroll', checkScroll);
window.addEventListener('resize', checkScroll);

const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has('gender') && !urlParams.has('category')) {
    loadProducts();
}