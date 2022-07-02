var products = [];

module.exports = class Product {
    constructor(title, imageURL, description, price) {
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }
    save() {
        this.id = Math.random().toString();
        products.push(this);
    }
    static fetshAll() {
        return products;
    }
    static findByID(id, callback) {
        const product = products.find(p => p.id === id);
        callback(product);
    }
    static updateProduct(id, title, imageURL, description, price) {
        const productIndex = products.findIndex(prod => prod.id === id);
        products[productIndex].imageURL = imageURL;
        products[productIndex].title = title;
        products[productIndex].description = description;
        products[productIndex].price = price;
    }
}