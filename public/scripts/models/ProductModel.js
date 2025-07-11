export default class ProductModel {
    constructor() {
        this.products = [];
    }

    setProducts(products) {
        this.products = products;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(p => p.id === id);
    }
}