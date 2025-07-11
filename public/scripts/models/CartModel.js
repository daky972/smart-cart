export default class CartModel {
    constructor() {
        this.cartProducts = [];
    }

    setCartProducts(products) {
        const addProduct = {
            id: products.id,
            title: products.title,
            price: products.price
        }

        this.cartProducts.push(addProduct);
    }
}