  document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("product_id");

    if (productId) {
      const products = await fetchProducts(); // Отримуємо всі продукти
      const product = products.find(product => product.id === parseInt(productId));
      if (product) {
        renderProductDetails(product);
        renderRelatedProducts(product.category, products, product.id);
      } else {
        document.getElementById("product-detail-container").innerHTML =
          "<p>Продукт не знайдено.</p>";
      }
    } else {
      document.getElementById("product-detail-container").innerHTML =
        "<p>Ідентифікатор продукту не вказано.</p>";
    }
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Simao12342/Lux-Cafe-/main/TEXT/Products.txt"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Помилка при отриманні даних: ", error);
    }
  };

  const renderProductDetails = (product) => {
    const container = document.getElementById("product-detail-container");
    container.innerHTML = `
      <h2>${product.title}</h2>
      <div class="details-info-container">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="details-info-text">
          <p>Ціна: ${product.price}₴</p>
          <h3>Детальна інформація:</h3>
          <span>${product.description}</span>
        </div>
      </div>
    `;
  };

  const renderRelatedProducts = (currentCategory, products, currentProductId) => {
    const relatedProductsContainer = document.createElement('div');
    relatedProductsContainer.innerHTML = '<h3>Супутні товари:</h3>';
    document.body.appendChild(relatedProductsContainer);

    products.filter(product => product.category !== currentCategory && product.id !== currentProductId).forEach(product => {
      const productElement = document.createElement('div');
      productElement.innerHTML = `
        <h4>${product.title}</h4>
        <img src="${product.image}" alt="${product.title}" style="width: 100px; height: auto;">
        <p>Ціна: ${product.price}₴</p>
        <p>${product.description}</p>
      `;
      relatedProductsContainer.appendChild(productElement);
    });
  };

