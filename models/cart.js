const {
    Sequelize
} = require('sequelize');

const sequelize = require('../util/db');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

})

module.exports = Cart;

// const Product = require('./Product');
// module.exports = class Cart {
//     constructor() {
//         this.products = [];
//         this.totalPrice = 0;
//         this.numOfProducts = 0;
//     }
//     addProduct(product) {
//         this.products.push(product);
//         this.numOfProducts = this.numberOfProducts + 1;
//         this.totalPrice = this.totalPrice + product.price;
//     }
//     removeProduct(productID, productPrice) {
//         this.totalPrice = this.totalPrice - productPrice;
//         this.numOfProducts = this.numberOfProducts - 1;
//         this.products = this.products.filter(product => product.id !== productID);
//     }
//     getProducts() {
//         return this.products;
//     }
// }