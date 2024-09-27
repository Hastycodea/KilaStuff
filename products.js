// variables
const productContainer = document.querySelector(".products .row");
const bestSellingProducts = document.querySelector(".best-products .row");
const cartTotal = document.querySelector('cart-total');
const totalItems = document.querySelector('total-items');

// cart
let cart = [];
let buttonsDom = [];

// getting products
class Products {
    async getProducts() {
        try {
            let result = await fetch("products.json")
            let data = await result.json(); //parsing the json

            // accessing product array inside the object
            let products = data.products;
            products = products.map(item => {
                const { id, title, description, image, price } = item;
                return { id, title, description, image, price };
            });
            return products;

        } catch (error) {
            console.log(error);
        }
    }
}




// displaying products
class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result += `
            <div class="col-6 col-lg-3 mb-3">
                  <div class="card">
                    <a href="detail.html"> <img src=${product.image} class="card-img-top" alt="..."> </a>
                    <div class="card-body">
                      <h5 class="card-title">${product.title}</h5>
                      <p class="card-text">${product.description}</p>
                      <p>KSh ${product.price}</p>
                      <button class="btn bag-btn" data-id=${product.id}>Add to cart</button>
                    </div>
                  </div>
                </div>`;
        });
        productContainer.innerHTML = result;
    }
    displayBestProducts(products) {
        const bestProducts = products.slice(0, 4);

        let result = '';
        bestProducts.forEach(product => {
            result += `
            <div class="col-6 col-lg-3">
                  <div class="card">
                    <a href="detail.html"> <img src=${product.image} class="card-img-top" alt="..."> </a>
                    <div class="card-body">
                      <h5 class="card-title">${product.title}</h5>
                      <p class="card-text">${product.description}</p>
                      <a class="btn bag-btn d-flex align-items-center" >
                        <ion-icon name="cart" class="me-auto"></ion-icon>
                        <span class="m-0 text-center w-100"> Add to cart</span>
                        </a>
                    </div>
                  </div>
                </div>`;
        });
        bestSellingProducts.innerHTML = result;

    }

    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        // console.log(buttons);

        buttonsDom = buttons;

        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);

            if (inCart) {
                button.innerText = 'In Cart';
                button.disabled = true;
            }

            button.addEventListener('click', event => {
                event.target.innerText = 'In Cart'
                button.disabled = true;

                //get product from products
                let cartItem = { ...Storage.getProduct(id), amount: 1 };

                //add to cart
                cart = [...cart, cartItem];

                //save cart in local Storage
                Storage.saveCart(cart);

                //set cart values
                this.setCartValues(cart);


            });
        });

        
    }

    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;

        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });

        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        totalItems.innerText = itemsTotal;

    }

}

class Storage {
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }

    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // getting all products
    products.getProducts().then(products => {
        ui.displayProducts(products);
    }).then(() => {
        ui.getBagButtons();
    });

    // getting best products
    products.getProducts().then(items => {
        ui.displayBestProducts(items);
    });



});

