const express = require('express');
const path = require('path');
const rootDirectory = require('../util/path');

const router = express.Router();
const products = [];

router.get('/addProduct', (req, res, next) => {
    // res.sendFile(path.join(rootDirectory, 'views', 'addProduct.html'));
    res.render('addProduct', {
        pageTitle: 'Add Product',
        path: '/admin/addProduct',
    });
});
router.post('/addProduct', (req, res, next) => {
    var productTitle = req.body.title;
    products.push({
        title: productTitle
    });
    // console.log(JSON.parse(JSON.stringify(req.body)));
    res.redirect('/');
});

exports.routes = router;
exports.products = products;