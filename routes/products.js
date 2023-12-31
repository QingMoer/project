const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// show updated products
// { category } =
router.get('/', ensureAuthenticated, async (req, res, next) => {
    const { category } = req.query;
    if (category){
        const products = await Product.find({category});
        res.render('products/products', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/products', { products, category: 'all' });
    }
});

module.exports = router;