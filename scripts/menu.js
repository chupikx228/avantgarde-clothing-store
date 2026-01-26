const navTriggers = document.querySelectorAll('.nav-trigger');
const fullscreenMenu = document.getElementById('fullscreen-menu');
const headerButtons = document.querySelectorAll('.header__buttons button');

const isMainPage = window.location.pathname.includes('index.html') ||
    window.location.pathname === '/' ||
    window.location.pathname.endsWith('/');

function callDisplayProducts() {
    if (typeof window.displayProducts === 'function') {
        window.displayProducts();
    } else {
        setTimeout(callDisplayProducts, 50);
    }
}

navTriggers.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        const gender = btn.dataset.menu.toUpperCase();

        window.currentGender = gender;

        fullscreenMenu.classList.add('active');
        headerButtons.forEach(b => b.style.color = 'white');

        console.log('Hovered on gender:', gender);
    });

    btn.addEventListener('mouseleave', (e) => {
        setTimeout(() => {
            if (!fullscreenMenu.matches(':hover')) {
                fullscreenMenu.classList.remove('active');
                headerButtons.forEach(b => b.style.color = '');
            }
        }, 100);
    });
});

fullscreenMenu.addEventListener('mouseleave', () => {
    fullscreenMenu.classList.remove('active');
    headerButtons.forEach(b => b.style.color = '');
});

document.querySelectorAll('.fullscreen-menu .menu-content a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.textContent.trim();

        if (isMainPage) {
            window.currentCategory = category;
            callDisplayProducts();
            console.log('Selected - Gender:', window.currentGender, 'Category:', category);
        } else {
            const categoryParam = category.toLowerCase().replace(/\s+/g, '-');
            const genderParam = window.currentGender ? `gender=${window.currentGender.toLowerCase()}` : '';
            window.location.href = `../index.html?category=${categoryParam}${genderParam ? '&' + genderParam : ''}`;
        }

        fullscreenMenu.classList.remove('active');
        headerButtons.forEach(b => b.style.color = '');
    });
});