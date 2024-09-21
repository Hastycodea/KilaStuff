// variables
const productContainer = document.querySelector(".products .row");

// getting products
class Products {
    async getPoducts() {
        try {
            let result = await fetch("products.json")
            let data = await result.json(); //parsing the json

            // accessing product array inside the object
            let products = data.products;
            products = products.map(item => {
                const { title, description, image } = item;
                return {title, description, image};
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
                      <a href="#" class="btn btn-primary">Add to cart</a>
                    </div>
                  </div>
                </div>`;
        });

        productContainer.innerHTML = result;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // getting all products
    products.getPoducts().then(products => {
        ui.displayProducts(products);
    });

});

