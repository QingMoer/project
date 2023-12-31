const express = require('express');
const Product = require("../models/products");
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/:id',ensureAuthenticated, async (req,res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/delete', { product });
});

router.delete('/:id',ensureAuthenticated, async (req,res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

module.exports = router;