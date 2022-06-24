const express = require('express');
const path = require('path');
const rootDirectory = require('../util/path');

const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    // console.log(adminData.products);
    const shopProducts = adminData.products;
    res.render('shop', {
        pageTitle: 'Shop',
        path: '/',
        hasProducts: shopProducts.length > 0,
        products: shopProducts
    });
    res.sendFile(path.join(rootDirectory, 'views', 'shop.html'));
});

module.exports = router;