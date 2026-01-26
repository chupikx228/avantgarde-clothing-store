document.addEventListener("DOMContentLoaded", () => {
    const hamburgerIcon = document.querySelector(".hamburger-icon");
    const menuItems = document.querySelector(".menu-items");
    const lines = document.querySelectorAll(".line");
    const closeMenuBtn = document.querySelector(".close-menu");
    const DESKTOP_WIDTH = 1000;
    const isMainPage = window.location.pathname.includes('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/');

    const indexPath = isMainPage ? 'index.html' : '../index.html';

    const callDisplayProducts = () => {
        if (typeof window.displayProducts === 'function') {
            window.displayProducts();
        } else {
            setTimeout(callDisplayProducts, 50);
        }
    };

    const submenuHomme = document.createElement("div");
    submenuHomme.className = "menu-items submenu-items";
    submenuHomme.style.background = "#1A1917";
    submenuHomme.innerHTML = `
        <button class="back-button">←</button>
        <a href="#" data-category="NEW ARRIVALS">NEW ARRIVALS</a>
        <a href="#" data-category="READY TO WEAR">READY TO WEAR</a>
        <a href="#" data-category="SHOES">SHOES</a>
        <a href="#" data-category="BAGS">BAGS</a>
        <a href="#" data-category="JEWELRY">JEWELRY</a>
    `;
    document.body.appendChild(submenuHomme);

    const submenuFemme = document.createElement("div");
    submenuFemme.className = "menu-items submenu-items";
    submenuFemme.style.background = "#1A1917";
    submenuFemme.innerHTML = `
        <button class="back-button">←</button>
        <a href="#" data-category="NEW ARRIVALS">NEW ARRIVALS</a>
        <a href="#" data-category="READY TO WEAR">READY TO WEAR</a>
        <a href="#" data-category="SHOES">SHOES</a>
        <a href="#" data-category="BAGS">BAGS</a>
        <a href="#" data-category="JEWELRY">JEWELRY</a>
    `;
    document.body.appendChild(submenuFemme);

    const closeBurgerMenu = () => {
        menuItems.classList.remove('show');
        submenuHomme.classList.remove('show');
        submenuFemme.classList.remove('show');

        document.body.style.overflow = 'visible';
        lines.forEach(line => {
            line.style.backgroundColor = 'black';
        });
    };

    hamburgerIcon.addEventListener("click", () => {
        menuItems.classList.toggle("show");

        if (menuItems.classList.contains("show")) {
            document.body.style.overflow = "hidden";
            lines.forEach(line => {
                line.style.backgroundColor = "white";
            });
        } else {
            document.body.style.overflow = "visible";
            lines.forEach(line => {
                line.style.backgroundColor = "black";
            });
        }
    });

    closeMenuBtn.addEventListener("click", () => {
        closeBurgerMenu();
    });

    const hommeLink = menuItems.querySelectorAll('a')[0];
    const femmeLink = menuItems.querySelectorAll('a')[1];

    if (hommeLink) {
        hommeLink.addEventListener("click", (e) => {
            e.preventDefault();

            window.currentGender = 'HOMME';

            if (isMainPage) {
                callDisplayProducts();
                console.log('Selected gender:', window.currentGender);
            }

            menuItems.classList.remove("show");
            submenuHomme.classList.add("show");
        });
    }

    if (femmeLink) {
        femmeLink.addEventListener("click", (e) => {
            e.preventDefault();

            window.currentGender = 'FEMME';

            if (isMainPage) {
                callDisplayProducts();
                console.log('Selected gender:', window.currentGender);
            }

            menuItems.classList.remove("show");
            submenuFemme.classList.add("show");
        });
    }

    const backButtonHomme = submenuHomme.querySelector(".back-button");
    backButtonHomme.addEventListener("click", () => {
        submenuHomme.classList.remove("show");
        menuItems.classList.add("show");
    });

    const backButtonFemme = submenuFemme.querySelector(".back-button");
    backButtonFemme.addEventListener("click", () => {
        submenuFemme.classList.remove("show");
        menuItems.classList.add("show");
    });

    submenuHomme.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = link.dataset.category;

            if (isMainPage) {
                window.currentCategory = category;
                callDisplayProducts();
                console.log('Selected category:', category);

                submenuHomme.classList.remove("show");
                document.body.style.overflow = "visible";
                lines.forEach(line => {
                    line.style.backgroundColor = "black";
                });
            } else {
                const categoryParam = category.toLowerCase().replace(/\s+/g, '-');
                window.location.href = `${indexPath}?gender=homme&category=${categoryParam}`;
            }
        });
    });

    submenuFemme.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = link.dataset.category;

            if (isMainPage) {
                window.currentCategory = category;
                callDisplayProducts();
                console.log('Selected category:', category);

                submenuFemme.classList.remove("show");
                document.body.style.overflow = "visible";
                lines.forEach(line => {
                    line.style.backgroundColor = "black";
                });
            } else {
                const categoryParam = category.toLowerCase().replace(/\s+/g, '-');
                window.location.href = `${indexPath}?gender=femme&category=${categoryParam}`;
            }
        });
    });

    const cartLink = menuItems.querySelector('#cart');
    if (cartLink) {
        cartLink.addEventListener("click", (e) => {
            e.preventDefault();

            menuItems.classList.remove("show");
            document.body.style.overflow = "visible";
            lines.forEach(line => {
                line.style.backgroundColor = "black";
            });

            if (typeof window.openCart === 'function') {
                window.openCart();
            }
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth >= DESKTOP_WIDTH) {
            closeBurgerMenu();
        }
    });

    if (window.innerWidth >= DESKTOP_WIDTH) {
        closeBurgerMenu();
    }

});