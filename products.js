// variables
const productContainer = document.querySelector(".products .row");
const bestSellingProducts = document.querySelector(".best-products .row");

// getting products
class Products {
    async getPoducts() {
        try {
            let result = await fetch("products.json")
            let data = await result.json(); //parsing the json

            // accessing product array inside the object
            let products = data.products;
            products = products.map(item => {
                const { title, description, image, price } = item;
                return {title, description, image, price};
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
                      <a href="#" class="btn btn-primary">Add to cart</a>
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
                      <a href="#" class="btn d-flex align-items-center">
                        <ion-icon name="cart" class="me-auto"></ion-icon>
                        <span class="m-0 text-center w-100"> Add to cart</span>
                        </a>
                    </div>
                  </div>
                </div>`;
        });

        bestSellingProducts.innerHTML = result;

    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // getting all products
    products.getPoducts().then(products => {
        ui.displayProducts(products);
        ui.displayBestProducts(products);
    });

   

});

