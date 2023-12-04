const Product = require("../models/products");
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
router.use(bodyParser.urlencoded({extended: true}));
const categories = ['fruit', 'vegetables', 'dairy', 'other'];

router.get('/:id',ensureAuthenticated, async (req,res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
});

router.put('/:id',ensureAuthenticated, async (req,res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true });
    console.log(req.body);
    res.redirect(`/products/${product._id}`);
});






module.exports = router;