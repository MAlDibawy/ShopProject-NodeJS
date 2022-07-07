const Cart = require('../models/cart');
const Product = require('../models/product');

const cart = new Cart();

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/product-list', {
            pageTitle: 'All Products',
            path: '/products',
            products: products
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getProductByID = (req, res, next) => {
    console.log(req.params);
    const pID = req.params.productID;
    Product.findByPk(pID)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
}

exports.getHomePage = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/home-page', {
            pageTitle: 'Shop',
            path: '/',
            products: products
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            console.log(cart);
        })
        .catch(err => console.log(err));
    // const cartProducts = cart.getProducts();
    // res.render('shop/cart', {
    //     path: '/cart',
    //     pageTitle: 'Cart',
    //     products: cartProducts
    // });
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