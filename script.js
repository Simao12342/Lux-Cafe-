document.addEventListener('DOMContentLoaded', function () {
            const toggleButton = document.createElement('div');
            toggleButton.classList.add('menu-toggle');
            toggleButton.textContent = 'Меню';
            
            const nav = document.querySelector('.navbar');
            const logo = document.querySelector('.logo');

            // Вставляємо toggleButton відразу після логотипа
            logo.parentNode.insertBefore(toggleButton, logo.nextSibling);

            toggleButton.addEventListener('click', function () {
                const links = document.querySelector('.nav-links');
                links.classList.toggle('nav-active');
                this.textContent = this.textContent === 'Меню' ? 'Закрити' : 'Меню';
            });
        });