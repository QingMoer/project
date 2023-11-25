const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// Load Survey model
const User = require('../models/Survey');
const Survey = require('../models/Survey');


// create Page
router.get('/create', (req, res) => res.render('create'));

// create
router.post('/create', (req, res) => {
  const survey = new Survey(req.body);
  survey
    .save()
    .then((result) => res.redirect("/create"))
    .catch((err) => console.log(err));
  }
);
// edit
router.post('/edit', (req, res) => {
  survey
    .save()
    .then((result) => res.redirect("/detail"))
    .catch((err) => console.log(err));
  }
);




module.exports = router;