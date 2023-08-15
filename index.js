/*====================================================
index.js - Main Application Entry Point
====================================================*/
/*
    This file serves as the entry point for your Express application. It initializes the app, sets up middleware,
    and defines routes for various functionalities.
    It also includes comments explaining the purpose of each section.
*/

// Import required modules
const express = require('express');
const session = require('express-session');
const Database = require('./database.js');
const db = new Database('product.db');
const bodyParser = require('body-parser');

// Initialize the database
db.initialize();

// Create an instance of the Express router
const router = express.Router();

// Create an instance of the Express application
const app = express();
app.use(express.urlencoded({ extended: true }));

// Middleware to provide database access to routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Configure session middleware
app.use(session({
    secret: 'cmps450',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware to set user data in locals for templates
app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = {
            id: req.session.user.user_id,
            username: req.session.user.username
        };
    } else if (req.session.Admin) {
        res.locals.Admin = {
            id: req.session.Admin.Admin_id,
            username: req.session.Admin.username
        };
    }
    next();
});

// Configure the view engine and options
app.set('view engine', 'pug');
app.locals.pretty = true;

// Serve static files (CSS and other assets)
app.use(express.static('public/styles'));
app.use(express.static('public'));

// Enable JSON parsing in the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle GET request for retrieving data
app.get('/data', async (req, res) => {
    const data = await req.db.findAllProducts();
    res.json(data);
});

// Handle POST request for updating data
app.post('/data', function(req, res) {
    var transactionData = req.body.transactionData;
    var cartItems = req.body.cartItems;

    // Update the database
    cartItems.forEach(item => {
        db.products.update(
            { stock: db.literal('stock - ' + item.quantity) },
            { where: { id: item.productId } }
        );
    });

    // Respond to the client
    res.json({ success: true });
});

// Route handling using other route modules
app.use('/', require('./routes/startup'));
app.use('/', require('./routes/account'));
app.use('/', require('./routes/logout'));
app.use('/', require('./routes/cart'));
app.post('/cart');
app.use('/', require('./routes/checkoutsuccess'));
app.use('/', require('./routes/addproduct'));
app.use('/', require('./routes/allproducts'))
app.use('/', require('./routes/brandclothing'));
app.use('/', require('./routes/brandaccessories'));
app.use('/', require('./routes/brandfootwear'));
app.use('/', require('./routes/productinfo'));
app.use('/', require('./routes/brands'));

// Start the server on port 8888
app.listen(8888, () => {
    console.log("Server is running on port 8888");
});
