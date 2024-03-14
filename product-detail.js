 
      document.addEventListener("DOMContentLoaded", async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("product_id");

        if (productId) {
          const product = await getProductById(productId);
          if (product) {
            renderProductDetails(product);
          } else {
            document.getElementById("product-detail-container").innerHTML =
              "<p>Продукт не знайдено.</p>";
          }
        } else {
          document.getElementById("product-detail-container").innerHTML =
            "<p>Ідентифікатор продукту не вказано.</p>";
        }
      });

      const getProductById = async (id) => {
        try {
          const response = await fetch(
            "https://raw.githubusercontent.com/Simao12342/Lux-Cafe-/main/TEXT/Products.txt"
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const products = await response.json();
          return products.find((product) => product.id === parseInt(id));
        } catch (error) {
          console.error("Помилка при отриманні даних: ", error);
        }
      };

      const renderProductDetails = (product) => {
        const container = document.getElementById("product-detail-container");
        container.innerHTML = `
                <h2>${product.title}</h2>
                <div class="details-info-container">
                <img src="${product.image}" alt="${product.title}" style="max-width: 100%; height: auto;">
                <div class="details-info-text">
                <span>${product.description}</span>
                <p>Ціна: ${product.price}₴</p></div></div>
                <!-- Додати інші деталі продукту за потреби -->
            `;
      };
 
