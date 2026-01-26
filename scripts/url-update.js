document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const gender = params.get('gender');
    const category = params.get('category');

    console.log('URL params - gender:', gender, 'category:', category);

    if (gender) {
        window.currentGender = gender.toUpperCase();
        console.log('Set currentGender:', window.currentGender);
    }

    if (category) {
        window.currentCategory = category.replace(/-/g, ' ').toUpperCase();
        console.log('Set currentCategory:', window.currentCategory);
    }

    const tryDisplayProducts = () => {
        if (typeof window.displayProducts === "function" && typeof window.resetInfiniteScroll === "function") {
            console.log('All functions ready, calling displayProducts');
            window.displayProducts();
        } else {
            console.log('Waiting for functions to load...');
            setTimeout(tryDisplayProducts, 50);
        }
    };

    if (gender || category) {
        tryDisplayProducts();
    }
});