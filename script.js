//Jashanpreet Kaur GLA2
// Function to fetch products from the API
async function getProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}

// Function to render products on the page
function renderProducts(products) {
    const productList = document.getElementById('products');
    productList.innerHTML = '';
    // Loop through each product and create a product card
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h2>${product.title}</h2>
                <p>${product.category}</p>
                <p>$${product.price}</p>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Function to initialize the page
async function init() {
    // Fetch products and render them initially
    const products = await getProducts();
    renderProducts(products);

    // Add event listener for sorting dropdown
    document.getElementById('sort-order').addEventListener('change', async function() {
        const sortOrder = this.value;
        const category = document.getElementById('category').value;
        // Get sorted and filtered products and render them
        const sortedProducts = await getSortedAndFilteredProducts(sortOrder, category);
        renderProducts(sortedProducts);
    });

    // Add event listener for category dropdown
    document.getElementById('category').addEventListener('change', async function() {
        const category = this.value;
        const sortOrder = document.getElementById('sort-order').value;
        // Get sorted and filtered products and render them
        const filteredProducts = await getSortedAndFilteredProducts(sortOrder, category);
        renderProducts(filteredProducts);
    });
}

// Function to get sorted and filtered products
async function getSortedAndFilteredProducts(sortOrder, category) {
    const products = await getProducts();
    let filteredProducts = products;
    // Filter products by category if a category is selected
    if (category !== '') {
        filteredProducts = products.filter(product => product.category === category);
    }
    // Sort products based on the selected order
    return filteredProducts.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
}

// Initialize the page
init();
