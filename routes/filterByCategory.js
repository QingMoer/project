const express = require('express');
const Product = require("../models/products");
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/category',ensureAuthenticated, (req))