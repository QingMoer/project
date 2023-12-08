const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
app.use(express.static(path.join(__dirname, 'public')));
// Passport Config
require('./config/passport')(passport);

// global middleware
// 1. body-parser to parse request body
// 2. override HTTP methods
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// routing middleware
const indexRouter = require('./routes/index.js');
const productRouter = require('./routes/products.js');
const showRouter = require('./routes/show.js');
const editRouter = require('./routes/edit.js');
const createRouter = require('./routes/create.js');
const deleteRouter = require('./routes/delete.js');

mongoose.connect('mongodb+srv://root:root123456@cluster0.5z0oflj.mongodb.net/part1')
    .then(() => {
      console.log('Mongo connection open');
    })
    .catch(err => {
      console.log('Mongo Connection Error', err);
    });
var serveStatic = require('serve-static'); // public
app.use(serveStatic('public')); // path：public


// 1. set view path, __dirname references current directory
// 2. set view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/', indexRouter);

app.use('/products', productRouter);
app.use('/products', showRouter)
app.use('/products', createRouter);
app.use('/products', editRouter);
app.use('/products', deleteRouter);

app.use('/edit', editRouter);
app.use('/new', createRouter);

app.use('/delete', deleteRouter);


const PORT = process.env.PORT || 6060;

app.listen(PORT, console.log(`Server running on  ${PORT}`));

app.listen(process.env.PORT || 3030, () => {
    console.log('Localhost server listening');
});

module.exports = app;