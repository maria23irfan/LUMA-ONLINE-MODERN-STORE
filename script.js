/* =====================================================
   LUMA E-COMMERCE JAVASCRIPT
===================================================== */


/* =====================================================
   CART
===================================================== */

let cart = [];


/* =========================
   SELECT ELEMENTS
========================= */

const cartButton = document.querySelector(".cart-btn");
const cartPanel = document.querySelector(".cart-panel");
const closeCartButton = document.querySelector(".close-cart");
const cartOverlay = document.querySelector(".cart-overlay");

const cartCount = document.querySelector(".cart-count");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total strong");

const addCartButtons = document.querySelectorAll(".add-cart");
const wishlistButtons = document.querySelectorAll(".wishlist-btn");

const newsletterForm = document.querySelector(".newsletter-form");


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    cartPanel.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";
}


/* =====================================================
   CART EVENTS
===================================================== */

if (cartButton) {

    cartButton.addEventListener("click", openCart);

}

if (closeCartButton) {

    closeCartButton.addEventListener("click", closeCart);

}

if (cartOverlay) {

    cartOverlay.addEventListener("click", closeCart);

}


/* =====================================================
   ADD TO CART
===================================================== */

addCartButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard =
            button.closest(".product-card");

        const productName =
            productCard.querySelector("h3").textContent;

        const priceElement =
            productCard.querySelector(".price");

        const price =
            parseFloat(
                priceElement.textContent.replace("$", "")
            );


        const existingProduct =
            cart.find(
                item => item.name === productName
            );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: productName,
                price: price,
                quantity: 1
            });

        }


        updateCart();

        openCart();

        showAddedMessage(button);

    });

});


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    if (!cartItemsContainer) {
        return;
    }


    cartItemsContainer.innerHTML = "";


    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "$0.00";

        return;
    }


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach((item, index) => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div class="cart-item-image"></div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Quantity: ${item.quantity}
                </p>

                <span class="cart-item-price">
                    $${(
                        item.price *
                        item.quantity
                    ).toFixed(2)}
                </span>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
                aria-label="Remove ${item.name}"
            >
                <i class="fa-solid fa-trash"></i>
            </button>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    cartCount.textContent =
        totalItems;


    cartTotal.textContent =
        `$${totalPrice.toFixed(2)}`;


    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);

            cart.splice(index, 1);

            updateCart();

        });

    });

}


/* =====================================================
   ADDED MESSAGE
===================================================== */

function showAddedMessage(button) {

    const originalText =
        button.textContent;

    button.textContent =
        "Added ✓";

    button.style.color =
        "#c8a96b";


    setTimeout(() => {

        button.textContent =
            originalText;

        button.style.color =
            "";

    }, 1200);

}


/* =====================================================
   WISHLIST
===================================================== */

wishlistButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const icon =
            button.querySelector("i");


        if (
            icon.classList.contains(
                "fa-regular"
            )
        ) {

            icon.classList.remove(
                "fa-regular"
            );

            icon.classList.add(
                "fa-solid"
            );

        } else {

            icon.classList.remove(
                "fa-solid"
            );

            icon.classList.add(
                "fa-regular"
            );

        }

    });

});


/* =====================================================
   NEWSLETTER
===================================================== */

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const emailInput =
                newsletterForm.querySelector(
                    "input"
                );


            const email =
                emailInput.value.trim();


            if (email === "") {

                emailInput.focus();

                return;

            }


            alert(
                "Thanks for subscribing to LUMA!"
            );


            emailInput.value = "";

        }
    );

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeCart();

        }

    }
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

/*
   These are the elements that will animate
   when they enter the screen.
*/

const scrollElements =
    document.querySelectorAll(
        `
        .section-heading,
        .category-card,
        .product-card,
        .featured-content,
        .sale-content,
        .newsletter
        `
    );


/*
   Add the reveal class BEFORE observing them.
*/

scrollElements.forEach((element) => {

    element.classList.add("reveal");

});


/*
   Intersection Observer
*/

const scrollObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    /*
                       Element entered screen.
                       Start animation.
                    */

                    entry.target.classList.add(
                        "visible"
                    );

                } else {

                    /*
                       Element left screen.
                       Remove class so it can
                       animate again when we scroll
                       back to it.
                    */

                    entry.target.classList.remove(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"
        }
    );


/*
   Start observing everything.
*/

scrollElements.forEach((element) => {

    scrollObserver.observe(element);

});


/* =====================================================
   INITIALIZE CART
===================================================== */

updateCart();