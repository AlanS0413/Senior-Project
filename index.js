const express = require('express');
const session = require('express-session');
const Database = require('./database.js');
const db = new Database('product.db');
const axios = require('axios');
const bodyParser = require('body-parser');
const paypal = require('paypal-rest-sdk');


db.initialize();
const router = express.Router();

const app = express();
app.use(express.urlencoded({extended: true}));


app.use((req, res, next) => {
    req.db = db;
    next();
});
app.use(session({
    secret: 'cmps450',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));


app.use((req, res, next)=>{
    if (req.session.user) {
        res.locals.user= {
            id: req.session.user.user_id,
            username: req.session.user.username
        }
    }else if (req.session.Admin) {
        res.locals.Admin= {
            id: req.session.Admin.Admin_id,
            username: req.session.Admin.username
        }
    }
    next();
});

app.set('view engine', 'pug');

app.locals.pretty = true;

app.use(express.static('public/styles'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/data', async (req, res) => {
    const data = await req.db.findAllProducts();
    res.json(data);
});

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





app.listen(8888, () => {
    console.log("Server is running on port 8888")
});
