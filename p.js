  // Array holding product data
  const products = [
    {
      title: "Product 1",
      description: "Some quick example text to build on the card title.",
      image: "assets/product1.png",
    },
    {
      title: "Product 2",
      description: "Another example text to build on the card title.",
      image: "assets/product1.png",
    },
    {
      title: "Product 3",
      description: "Third example text to build on the card title.",
      image: "assets/product1.png",
    },
    {
      title: "Product 4",
      description: "More example text for the fourth product.",
      image: "assets/product1.png",
    },
    {
      title: "Product 4",
      description: "More example text for the fourth product.",
      image: "assets/product1.png",
    },
    {
        title: "Product 4",
        description: "More example text for the fourth product.",
        image: "assets/product1.png",
      },
    {
      title: "Product 4",
      description: "More example text for the fourth product.",
      image: "assets/product1.png",
    },
    {
        title: "Product 4",
        description: "More example text for the fourth product.",
        image: "assets/product1.png",
      },
    {
      title: "Product 4",
      description: "More example text for the fourth product.",
      image: "assets/product1.png",
    },
    {
      title: "Product 4",
      description: "More example text for the fourth product.",
      image: "assets/product1.png",
    },
    {
      title: "Product 4",
      description: "More example text for the fourth product.",
      image: "assets/product1.png",
    },
    {
      title: "Product 4",
      description: "More example text for the fourth product.",
      image: "assets/product1.png",
    },
    
    // Add more products as needed
  ];

  // Function to dynamically generate product HTML
  function renderProducts() {
    const productsContainer = document.querySelector(".products .row");

    products.forEach(product => {
      const productHTML = `
        <div class="col-6 col-lg-3">
          <div class="card">
            <a href="detail.html"> <img src="${product.image}" class="card-img-top" alt="${product.title}"> </a>
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <a href="#" class="btn btn-primary">Add to cart</a>
            </div>
          </div>
        </div>
      `;

      // Append the generated HTML to the container
      productsContainer.innerHTML += productHTML;
    });
  }

  // Call the renderProducts function when the page loads
  window.onload = renderProducts;
