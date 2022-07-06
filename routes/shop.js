const express = require('express');
const path = require('path');

const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getHomePage);

router.get('/products', shopController.getProducts);

router.get('/products/:product_id', shopController.getProductByID);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/removeFromCart', shopController.postRemoveFromCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;