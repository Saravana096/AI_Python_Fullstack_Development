let cart = [];


// Load cart from sessionStorage
const savedCart = sessionStorage.getItem("cart");

if (savedCart) {
    cart = JSON.parse(savedCart);
}


// Add product to cart
function addToCart(name, price) {

    const product = {
        name: name,
        price: price
    };

    cart.push(product);

    saveCart();

    renderCart();
}


// Save cart to sessionStorage
function saveCart() {

    sessionStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// Render cart items
function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    // Clear existing cart
    cartItems.innerHTML = "";


    let total = 0;


    // Create cart items dynamically
    cart.forEach(function (item, index) {

        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");


        const itemName =
            document.createElement("span");

        itemName.textContent = item.name;


        const itemPrice =
            document.createElement("span");

        itemPrice.textContent =
            "₹" + item.price;


        const removeButton =
            document.createElement("button");

        removeButton.textContent = "Remove";

        removeButton.classList.add(
            "remove-button"
        );


        removeButton.addEventListener(
            "click",
            function () {

                removeFromCart(index);

            }
        );


        cartItem.appendChild(itemName);

        cartItem.appendChild(itemPrice);

        cartItem.appendChild(removeButton);


        cartItems.appendChild(cartItem);


        total = total + item.price;

    });


    cartTotal.textContent = total;
}


// Remove product
function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    renderCart();
}


// Clear entire cart
function clearCart() {

    cart = [];

    sessionStorage.removeItem("cart");

    renderCart();
}


// Display cart when page loads
renderCart();