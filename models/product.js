const products = [];

module.exports = class Product {
    constructor(title, imageURL, description, price) {
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }
    save() {
        products.push(this);
    }
    static fetshAll() {
        return products;
    }
}