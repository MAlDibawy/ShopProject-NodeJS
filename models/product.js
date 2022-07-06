const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageURL: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;



// var products = [];

// module.exports = class Product {
//     constructor(title, imageURL, description, price) {
//         this.title = title;
//         this.imageURL = imageURL;
//         this.description = description;
//         this.price = price;
//     }
//     save() {
//         this.id = Math.random().toString();
//         products.push(this);
//     }
//     static updateProduct(id, title, imageURL, description, price) {
//         const productIndex = products.findIndex(prod => prod.id === id);
//         products[productIndex].imageURL = imageURL;
//         products[productIndex].title = title;
//         products[productIndex].description = description;
//         products[productIndex].price = price;
//     }

//     static deleteProduct(id) {
//         products = products.filter(product => product.id !== id);
//     }

//     static fetshAll() {
//         return products;
//     }
//     static findByID(id, callback) {
//         const product = products.find(p => p.id === id);
//         callback(product);
//     }

// }