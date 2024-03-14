document.addEventListener('DOMContentLoaded', function() {
    var productTitle = new URLSearchParams(window.location.search).get('title');
    loadProductDetails(productTitle);
});

function loadProductDetails(productTitle) {
    // Запит до сервера за деталями товарів
    fetch('TEXT/Products.txt')
        .then(response => response.json())
        .then(data => {
            // Знаходимо продукт з відповідною назвою
            const product = data.find(p => p.title === productTitle);
            if (product) {
                updateProductDetails(product);
                displayRelatedProducts(data, product.category === "Pizza" ? "Drinks" : "Pizza");
            } else {
                console.error('Продукт не знайдено');
            }
        })
        .catch(error => console.error('Помилка при завантаженні деталей товару:', error));
}

function updateProductDetails(product) {
    // Встановлюємо заголовок сторінки
    document.title = product.title;

    // Оновлюємо вміст сторінки даними про товар
    const productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = `
        <h1 class="product-info-title">${product.title}</h1>
        <div class="product-info-page">
        <img src="${product.image}" alt="${product.title}" style="max-width: 100%; height: auto;">
        <div>
        <p class="page-info-price">${product.price} ₴</p>
        <p class="page-description">Детальна інформація:</p>
        <p class="page-info-description">${product.description}</p>
        </div></div>
    `;
}

function displayRelatedProducts(products, relatedCategory) {
    const container = document.getElementById('relatedProductsContainer');
    container.innerHTML = '<h2>Супутні товари</h2>';

    // Відфільтровуємо товари за заданою категорією
    const filteredProducts = products.filter(product => product.category === "Drinks");

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
            productElement.setAttribute('data-product-title', product.title);
            productElement.setAttribute('onclick', "goToProductPage(this)");
            productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="width: 100px; height: auto;">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>${product.price}₴</p>
        `;
        container.appendChild(productElement);
    });
}
// function goToProductPage(element) {
//     var productTitle = element.getAttribute('data-product-title');
//     // Замінюємо пробіли на підкреслення або використовуємо інший механізм для створення URL-friendly назви
//     var titleForUrl = encodeURIComponent(productTitle);
//     window.location.href = 'product.html?title=' + titleForUrl;
}
