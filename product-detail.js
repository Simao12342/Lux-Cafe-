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
          <h3 class="detailInfo">Детальна інформація:</h3>
          <span>${product.description}</span>
        </div>
      </div>
    `;
  };

  const renderRelatedProducts = (currentCategory, products, currentProductId) => {
    const relatedProductsContainer = document.querySelector('.relatedProductContainer');
   
    
    products.filter(product => product.category !== currentCategory && product.id !== currentProductId).forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('relatedProduct');
      productElement.innerHTML = `
        <h4>${product.title}</h4>
        <img src="${product.image}" alt="${product.title}" style="width: 200px; height: auto;">
        <p>Ціна: ${product.price}₴</p>
        
      `;
      // <p>${product.description}</p>
      relatedProductsContainer.appendChild(productElement);
      productElement.style.cursor = 'pointer';
      productElement.addEventListener('click', () => {
      window.location.href = `product-detail.html?product_id=${product.id}`; // Перенаправлення користувача на сторінку деталей продукту
    });
    });
  };
  document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.relatedProductContainer');
    const scrollLeftButton = document.querySelector('.scroll-button.left');
    const scrollRightButton = document.querySelector('.scroll-button.right');
  
    scrollLeftButton.addEventListener('click', () => {
      scrollContainer.scrollBy({ left: -400, behavior: 'smooth' });
    });
  
    scrollRightButton.addEventListener('click', () => {
      scrollContainer.scrollBy({ left: 400, behavior: 'smooth' });
    });
  });
  
