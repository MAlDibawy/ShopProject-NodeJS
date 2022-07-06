const Cart = require('../models/cart');
const Product = require('../models/product');

const cart = new Cart();

exports.getProducts = (req, res, next) => {
    const shopProducts = Product.fetshAll();
    res.render('shop/product-list', {
        pageTitle: 'All Products',
        path: '/products',
        products: shopProducts
    });
};

exports.getProductByID = (req, res, next) => {
    const pID = req.params.product_id;
    Product.findByID(pID, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    });
}


exports.getHomePage = (req, res, next) => {
    const shopProducts = Product.fetshAll();
    res.render('shop/home-page', {
        pageTitle: 'Shop',
        path: '/',
        products: shopProducts
    });
}

exports.getCart = (req, res, next) => {
    const cartProducts = cart.getProducts();
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Cart',
        products: cartProducts
    });
}

exports.postCart = (req, res, next) => {
    const productID = req.body.productID;
    Product.findByID(productID, product => {
        cart.addProduct(product);
    });
    res.redirect('/cart');
}

exports.postRemoveFromCart = (req, res, next) => {
    const productID = req.body.productID;
    const productPrice = req.body.productPrice;
    cart.removeProduct(productID, productPrice);
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}