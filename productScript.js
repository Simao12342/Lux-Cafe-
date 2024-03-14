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
        <h1>${product.title}</h1>
        <img src="${product.image}" alt="${product.title}" style="max-width: 100%; height: auto;">
        <p>${product.description}</p>
        <p>Ціна: ${product.price} грн</p>
    `;
}
