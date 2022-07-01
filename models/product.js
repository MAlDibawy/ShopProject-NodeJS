const products = [];

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
}