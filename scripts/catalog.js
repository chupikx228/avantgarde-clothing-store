document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('products');
    const titleElement = document.querySelector('.container__text span');

    if (!container || !titleElement) {
        console.log('Not on main page, skipping catalog.js initialization');
        return;
    }

    if (!window.currentGender) {
        window.currentGender = null;
    }

    if (!window.currentCategory) {
        window.currentCategory = null;
    }

    window.displayProducts = () => {
        console.log('displayProducts called');
        console.log(
            'Current values - Gender:',
            window.currentGender,
            'Category:',
            window.currentCategory
        );

        if (window.currentGender && window.currentCategory) {
            titleElement.textContent = `${window.currentGender} > ${window.currentCategory}`;
        } else if (window.currentGender) {
            titleElement.textContent = window.currentGender;
        } else if (window.currentCategory) {
            titleElement.textContent = window.currentCategory;
        } else {
            titleElement.textContent = 'NEW ARRIVALS';
        }

        console.log(
            'Displaying products. Gender:',
            window.currentGender,
            'Category:',
            window.currentCategory
        );

        if (typeof window.resetInfiniteScroll === 'function') {
            window.resetInfiniteScroll();
        }
    };

    window.catalogReady = true;
});
