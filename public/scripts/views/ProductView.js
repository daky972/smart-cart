export default class ProductView {
    constructor(cartModel) {
        this.container = document.querySelector('#products-container');
        this.cartModel = cartModel;
    }

    renderProducts(products) {
        this.container.innerHTML = '';

        products.forEach(p => {
            const card = this.createCard(p);
            this.container.appendChild(card);
        });

    }

    createCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;

        const title = document.createElement('h2');
        title.textContent = product.title;

        const description = document.createElement('p');
        description.textContent = product.description;

        const price = document.createElement('h3');
        price.textContent = `$${product.price}`;

        const buyBtn = document.createElement('button');
        buyBtn.textContent = 'Buy';
        buyBtn.type = 'button';
        buyBtn.className = 'buy-btn';

        buyBtn.addEventListener('click', () => {
            this.cartModel.setCartProducts(product);
        });

        card.append(img, title, description, price, buyBtn);
        return card;
    }
}