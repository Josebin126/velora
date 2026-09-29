/* =========================================================
   VELORA — CART ENGINE
   ========================================================= */

let cart = JSON.parse(
    localStorage.getItem("veloraCart")
) || [];


/* =========================================================
   PRODUCT IMAGES
   ========================================================= */

const productImages = {
    "Obsidian": "images/products/obsidian.png",
    "Élan": "images/products/elan.png",
    "Noir": "images/products/noir.png"
};


/* =========================================================
   CART ELEMENTS
   ========================================================= */

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");


/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart() {

    localStorage.setItem(
        "veloraCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   FORMAT PRICE
   ========================================================= */

function formatPrice(price) {

    return `₹${Number(price).toLocaleString("en-IN")}`;

}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        emptyCart.style.display = "block";

        cartCount.textContent = "0";
        cartSubtotal.textContent = "₹0";
        cartTotal.textContent = "₹0";

        return;
    }

    emptyCart.style.display = "none";


    let totalQuantity = 0;
    let subtotal = 0;


    cart.forEach((item, index) => {

        const quantity = Number(item.quantity) || 1;

        const price =
            Number(
                String(item.price)
                    .replace(/[₹,]/g, "")
            ) || 0;


        totalQuantity += quantity;

        subtotal += price * quantity;


        const itemElement =
            document.createElement("article");

        itemElement.className = "cart-item";


        itemElement.innerHTML = `

            <div
                class="cart-item-image"
                style="
                    background-image:
                    url('${productImages[item.name] || ""}');
                "
            ></div>


            <div class="cart-item-info">

                <h2>${item.name}</h2>

                <div class="cart-item-category">
                    SIGNATURE COLLECTION
                </div>

                <div class="cart-item-price">
                    ${formatPrice(price)}
                </div>


                <div class="quantity-box">

                    <button
                        class="quantity-btn decrease-btn"
                        data-index="${index}"
                    >
                        −
                    </button>

                    <span class="quantity-value">
                        ${quantity}
                    </span>

                    <button
                        class="quantity-btn increase-btn"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-btn"
                    data-index="${index}"
                >
                    REMOVE
                </button>

            </div>


            <div class="cart-item-total">

                ${formatPrice(price * quantity)}

            </div>

        `;


        cartItems.appendChild(itemElement);

    });


    cartCount.textContent = totalQuantity;

    cartSubtotal.textContent =
        formatPrice(subtotal);

    cartTotal.textContent =
        formatPrice(subtotal);


    attachCartEvents();

}


/* =========================================================
   CART BUTTON EVENTS
   ========================================================= */

function attachCartEvents() {

    document.querySelectorAll(".increase-btn")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                cart[index].quantity =
                    (Number(cart[index].quantity) || 1) + 1;

                saveCart();

                renderCart();

            });

        });


    document.querySelectorAll(".decrease-btn")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                const quantity =
                    Number(cart[index].quantity) || 1;


                if (quantity > 1) {

                    cart[index].quantity =
                        quantity - 1;

                } else {

                    cart.splice(index, 1);

                }


                saveCart();

                renderCart();

            });

        });


    document.querySelectorAll(".remove-btn")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                cart.splice(index, 1);

                saveCart();

                renderCart();

            });

        });

}


/* =========================================================
   CHECKOUT
   ========================================================= */

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your VELORA bag is empty.");

            return;
        }

        window.location.href = "checkout.html";

    });

}


/* =========================================================
   INITIAL LOAD
   ========================================================= */

renderCart();