const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    const shopProducts = Product.fetshAll();
    res.render('shop/product-list', {
        pageTitle: 'All Products',
        path: '/products',
        products: shopProducts
    });
};

exports.getHomePage = (req, res, next) => {
    const shopProducts = Product.fetshAll();
    res.render('shop/home-page', {
        pageTitle: 'Shop',
        path: '/',
        products: shopProducts
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Cart'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}