document.addEventListener('DOMContentLoaded', function () {
    // Increment and Decrement functionality
    const decrementButtons = document.querySelectorAll('.btn-secondary:first-child');
    const incrementButtons = document.querySelectorAll('.btn-secondary:last-child');
    const quantities = document.querySelectorAll('.button-increment p');
    const prices = document.querySelectorAll('.cart-price p');
    const subtotalElement = document.querySelector('.col-3 .d-flex:last-child p');

    let subtotal = 0;

    // Calculate initial subtotal
    function calculateSubtotal() {
        subtotal = 0;
        prices.forEach((price, index) => {
            const priceValue = parseInt(price.textContent.replace('KSh ', '').replace(',', ''));
            const quantity = parseInt(quantities[index].textContent);
            subtotal += priceValue * quantity;
        });
        subtotalElement.textContent = `KSh ${subtotal.toLocaleString()}`;
    }

    calculateSubtotal();

    // Update subtotal on increment/decrement
    function updateSubtotal() {
        calculateSubtotal();
    }

    // Decrement quantity
    decrementButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            let quantity = parseInt(quantities[index].textContent);
            if (quantity > 1) {
                quantities[index].textContent = quantity - 1;
                updateSubtotal();
            }
        });
    });

    // Increment quantity
    incrementButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            let quantity = parseInt(quantities[index].textContent);
            quantities[index].textContent = quantity + 1;
            updateSubtotal();
        });
    });

    // Remove item from cart
    const removeButtons = document.querySelectorAll('.btn-outline-danger');
    removeButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const cartItem = button.closest('.d-flex'); // Select the closest flex container of the product
            cartItem.remove(); // Remove the item from the DOM

            // Recalculate subtotal after removing an item
            quantities[index].textContent = 0; // Set quantity to 0 for the removed item
            updateSubtotal();
        });
    });
});
