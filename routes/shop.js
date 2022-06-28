const express = require('express');
const path = require('path');

const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getHomePage);

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/checkout', shopController.getCheckout);

module.exports = router;