const express = require('express');
// const path = require('path');
// const rootDirectory = require('../util/path');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/addProduct', adminController.getAddProductPage);

router.post('/addProduct', adminController.postAddProductPage);

router.get('/products', adminController.getProducts);


module.exports = router;