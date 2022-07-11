const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/addProduct', {
        pageTitle: 'Add Product',
        path: '/admin/addProduct',
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
        title: title,
        price: price,
        imageURL: imageURL,
        description: description
    }).then(() => {
        res.redirect('/admin/products');
        // console.log('product created!');
    }).catch(err => {
        console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
    const pId = req.params.productId;
    Product.findByPk(pId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/editProduct', {
                pageTitle: 'Edit Product',
                path: '/admin/editProduct',
                product: product
            });
        });
};

exports.postEditProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const pid = req.body.productID;
    Product.findByPk(pid)
        .then(product => {
            product.title = title;
            product.imageURL = imageURL;
            product.price = price;
            product.description = description;
            return product.save();
        })
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const pid = req.body.productID;
    Product.findByPk(pid)
        .then(product => {
            return product.destroy();
        })
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                pageTitle: 'Admin Products',
                path: '/admin/products',
                products: products
            });
        }).catch(err => {
            console.log(err);
        });

}