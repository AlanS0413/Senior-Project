const express = require('express');
const session = require('express-session');
const Database = require('./database.js');
const db = new Database('product.db');
const bodyParser = require('body-parser');
db.initialize();
const router = express.Router();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: 'AKIATS4FQMQJ2PPI3N5X',
  secretAccessKey: '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',
  region: 'us-east-1'
});

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
    if (req.session.Admin) {
        console.log(req.session.Admin, "Admin session")
        Admin.findAdminByUsername(req.session.Admin.admin_id, (err, Admin) => {
            if (err) {
                return next(err);
            }
            if (!Admin) {
                return next(new Error('Admin not found'));
            }
            res.locals.admin = {
                id: Admin._id,
                username: Admin.username
            };
            next();
        });
    } else {
        next();
    }
});

app.use((req, res, next)=>{
    if (req.session.user) {
        res.locals.user= {
            id: req.session.user.user_id,
            username: req.session.user.username
        }
    }
    next();
});


app.set('view engine', 'pug');

app.locals.pretty = true;

app.use(express.static('public/styles'));
app.use(express.static('public'));

app.use('/', require('./routes/startup'));
app.use('/', require('./routes/account'));
app.use('/', require('./routes/logout'));
app.use('/', require('./routes/productinfo'));
app.use('/', require('./routes/cart'));
app.use('/', require('./routes/addproduct'));


app.listen(8080, () => {

    console.log("Server is running on port 8080")
});
