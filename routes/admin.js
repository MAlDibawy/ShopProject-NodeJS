const express = require('express');
const path = require('path');
const rootDirectory = require('../util/path');

const router = express.Router();

router.get('/addProduct', (req, res, next) => {
    res.sendFile(path.join(rootDirectory, 'views', 'addProduct.html'));
});
router.post('/addProduct', (req, res, next) => {
    // console.log(JSON.parse(JSON.stringify(req.body)));
    res.redirect('/');
});

module.exports = router;