export default class FilterModel {
    constructor(products) {
        this.products = products;
    }

    uniqueCategories() {
        const categories = this.products.map(p => p.category);
        return [...new Set(categories)];
    }

    filterProducts(filter) {

        if (filter === 'none') {
            return this.products
        }

        if (filter === 'lowest') {
            const lowestPrice = [...this.products].sort((a, b) => a.price - b.price);
            console.log(lowestPrice);
            return lowestPrice;
        }

        if (filter === 'highest') {
            const highestPrice = [...this.products].sort((a, b) => b.price - a.price);
            return highestPrice;
        }

        if (filter !== 'all') {
            return this.products.filter(p => p.category === filter);
        }

        return this.products;

    }
}