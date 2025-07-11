import ProductAPI from "../api/ProductAPI.js";
import ProductModel from "../models/ProductModel.js";
import FilterModel from "../models/FilterModel.js";
import ProductView from "../views/ProductView.js";
import FilterView from "../views/FilterView.js";
import CartModel from "../models/CartModel.js";

export default class AppController {
    constructor() {
        this.productAPI = new ProductAPI();
        this.productModel = new ProductModel();
        this.cartModel = new CartModel();
    }

    async init() {
        try {
            const products = await this.productAPI.fetchProducts();
            this.productModel.setProducts(products);

            const productView = new ProductView(this.cartModel);
            productView.renderProducts(this.productModel.products);

            const filterModel = new FilterModel(this.productModel.products);

            const filterView = new FilterView(productView, filterModel);
            filterView.renderCategories(filterModel.uniqueCategories());

            console.log(this.productModel.products);
            console.log(filterModel.uniqueCategories());

        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }
}