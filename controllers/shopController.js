const Product = require('../models/product');
const Order = require('../models/order');

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
            return cart
                .getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Cart',
                        products: products
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    const productID = req.body.productID;
    let newcart;
    let newqty = 1;
    req.user.getCart()
        .then(cart => {
            newcart = cart;
            return cart.getProducts({
                where: {
                    id: productID
                }
            });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                // get quantity and increase it by 1
                let oldqty = product.cartItem.qty;
                newqty = oldqty + 1;
                return product;
            }
            return Product.findByPk(productID)
        })
        .then(product => {
            return newcart.addProduct(product, {
                through: {
                    qty: newqty
                }
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.postRemoveFromCart = (req, res, next) => {
    const productID = req.body.productID;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({
                where: {
                    id: productID
                }
            });
        })
        .then(products => {
            const product = products[0];
            product.cartItem.destroy();
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.postOrder = (req, res, next) => {
    let orderedCart;
    req.user.getCart()
        .then(cart => {
            orderedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            req.user.createOrder()
                .then(order => {
                    return order.addProduct(products.map(product => {
                        product.orderItem = {
                            qty: product.cartItem.qty
                        };
                        return product;
                    }))
                })
                .catch(err => console.log(err));
        })
        .then(() => {
            return orderedCart.setProducts(null);
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({
            include: ['products']
        })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err))
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}