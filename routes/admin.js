const express = require('express');
// const path = require('path');
// const rootDirectory = require('../util/path');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/addProduct', adminController.getAddProduct);

router.post('/addProduct', adminController.postAddProduct);

router.get('/editProduct/:productId', adminController.getEditProduct);

router.post('/editProduct', adminController.postEditProduct);

router.get('/products', adminController.getProducts);

module.exports = router;