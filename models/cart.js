const Product = require('./Product');
module.exports = class Cart {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
        this.numOfProducts = 0;
    }
    addProduct(product) {
        this.products.push(product);
        this.numOfProducts = this.numberOfProducts + 1;
        this.totalPrice = this.totalPrice + product.price;
        console.log(this.products);
    }
}