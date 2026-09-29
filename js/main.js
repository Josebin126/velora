/* =========================================================
   VELORA — SMOOTH SCROLL + PREMIUM INTERACTIONS
   ========================================================= */

/* ---------------------------------------------------------
   LENIS — SMOOTH SCROLL
   --------------------------------------------------------- */

const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.2
});


function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


/* ---------------------------------------------------------
   CONNECT LENIS WITH GSAP
   --------------------------------------------------------- */

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}


/* ---------------------------------------------------------
   CUSTOM CURSOR
   --------------------------------------------------------- */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

if (cursor && cursorRing && window.matchMedia("(pointer: fine)").matches) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

    });


    function animateCursor() {

        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}


/* ---------------------------------------------------------
   MAGNETIC BUTTON EFFECT
   --------------------------------------------------------- */

const magneticButtons = document.querySelectorAll(
    ".hero-btn, .bag-btn"
);

magneticButtons.forEach((button) => {

    button.addEventListener("mousemove", (event) => {

        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });


    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0, 0)";

    });

});


/* ---------------------------------------------------------
   CURSOR HOVER INTERACTION
   --------------------------------------------------------- */

const interactiveElements = document.querySelectorAll(
    "a, button, .fashion-card"
);

interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        if (cursorRing) {
            cursorRing.style.width = "55px";
            cursorRing.style.height = "55px";
            cursorRing.style.borderColor =
                "rgba(199, 166, 106, 0.8)";
        }

    });


    element.addEventListener("mouseleave", () => {

        if (cursorRing) {
            cursorRing.style.width = "34px";
            cursorRing.style.height = "34px";
            cursorRing.style.borderColor =
                "rgba(242, 238, 231, 0.55)";
        }

    });

});


/* ---------------------------------------------------------
   SMOOTH ANCHOR NAVIGATION
   --------------------------------------------------------- */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        lenis.scrollTo(target, {
            offset: 0,
            duration: 1.5
        });

    });

});


/* =========================================================
   3D PRODUCT CARD INTERACTION
   ========================================================= */

document.querySelectorAll(".fashion-card").forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width;

        const y =
            (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 12;
        const rotateX = (y - 0.5) * -12;

        card.style.setProperty(
            "--mouse-x",
            `${x * 100}%`
        );

        card.style.setProperty(
            "--mouse-y",
            `${y * 100}%`
        );

        card.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(15px)
        `;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            translateZ(0)
        `;

    });

});


/* ---------------------------------------------------------
   PAGE READY
   --------------------------------------------------------- */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

    if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
    }

});
/* =========================================================
   CINEMATIC PRODUCT REVEAL
   ========================================================= */

const productReveal = document.getElementById("productReveal");
const revealClose = document.getElementById("revealClose");
const revealTitle = document.getElementById("revealTitle");
const revealImage = document.querySelector(".reveal-image");

document.querySelectorAll(".fashion-card").forEach((card) => {

    card.addEventListener("click", () => {

        const productName =
            card.dataset.product || "VELORA";

        revealTitle.textContent = productName;

        const image = card.querySelector(".fashion-image");

        if (image) {
            const computed =
                window.getComputedStyle(image);

            revealImage.style.backgroundImage =
                computed.backgroundImage;
        }

        productReveal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


function closeProductReveal() {

    productReveal.classList.remove("active");

    document.body.style.overflow = "";

}


revealClose.addEventListener(
    "click",
    closeProductReveal
);


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeProductReveal();
    }

});
/* =========================================================
   VELORA — PRODUCTS API
   ========================================================= */

async function loadProductsFromAPI() {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/products");

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();

        const cards = document.querySelectorAll(".fashion-card");

        products.forEach((product, index) => {

            if (!cards[index]) return;

            const card = cards[index];

            const title = card.querySelector("h3");
            const description = card.querySelector("p");

            if (title) {
                title.textContent = product.name;
            }

            if (description) {
                description.textContent = product.category;
            }

            card.dataset.product = product.name;

            // API PRICE
            const price = document.createElement("span");

            price.className = "api-price";

            price.textContent =
                `₹${product.price.toLocaleString("en-IN")}`;

            card.querySelector(".fashion-info").appendChild(price);
        });

        console.log("VELORA products loaded:", products);

    } catch (error) {
        console.error("VELORA API Error:", error);
    }
}

loadProductsFromAPI();
/* =========================================================
   VELORA — PRODUCT DETAILS API
   ========================================================= */

document.querySelectorAll(".fashion-card").forEach((card) => {

    card.addEventListener("click", async () => {

        const productName = card.dataset.product;

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/api/products"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }

            const products = await response.json();

            const product = products.find(
                item => item.name === productName
            );

            if (!product) {
                console.error("Product not found:", productName);
                return;
            }

            console.log("Selected VELORA product:", product);

            const revealPrice =
    document.querySelector(".reveal-price");

const revealDescription =
    document.querySelector(".reveal-description");

if (revealTitle) {
    revealTitle.textContent = product.name;
}

if (revealPrice) {
    revealPrice.textContent =
        `₹${product.price.toLocaleString("en-IN")}`;
}

if (revealDescription) {
    revealDescription.textContent =
        product.category;
}

        } catch (error) {

            console.error(
                "VELORA Product API Error:",
                error
            );

        }

    });

});
/* =========================================================
   VELORA — ADD TO BAG WITH QUANTITY
   ========================================================= */

let savedCart = JSON.parse(
    localStorage.getItem("veloraCart")
) || [];

let veloraCart = [];

savedCart.forEach((item) => {

    const existingProduct = veloraCart.find(
        product => product.name === item.name
    );

    if (existingProduct) {

        existingProduct.quantity += item.quantity || 1;

    } else {

        veloraCart.push({
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1
        });

    }
});

localStorage.setItem(
    "veloraCart",
    JSON.stringify(veloraCart)
);

const revealBuy = document.querySelector(".reveal-buy");
const bagCount = document.querySelector(".bag-btn span");

function updateBagCount() {

    const totalQuantity = veloraCart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if (bagCount) {
        bagCount.textContent = totalQuantity;
    }
}

if (revealBuy) {

    revealBuy.addEventListener("click", () => {

        const productName =
            document.querySelector("#revealTitle")?.textContent;

        const productPrice =
            document.querySelector(".reveal-price")?.textContent;

        if (!productName) return;

        const existingProduct = veloraCart.find(
            item => item.name === productName
        );

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            veloraCart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

        }

        localStorage.setItem(
            "veloraCart",
            JSON.stringify(veloraCart)
        );

        updateBagCount();

        revealBuy.innerHTML = "ADDED TO BAG ✓";

        setTimeout(() => {
            revealBuy.innerHTML =
                'ADD TO BAG <span>↗</span>';
        }, 1500);

        console.log("VELORA cart:", veloraCart);
    });
}

updateBagCount();
/* =========================================================
   VELORA — BAG BUTTON
   ========================================================= */

const bagButton = document.querySelector(".bag-btn");

if (bagButton) {

    bagButton.addEventListener("click", () => {

        window.location.href = "cart.html";

    });

}