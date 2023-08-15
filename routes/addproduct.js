/**
 * @file addproduct.js - Express Router for Adding Products to Inventory
 */

/**
 * This module defines an Express router responsible for handling the route to add products to the inventory.
 * It supports CSV file upload, form submission, and database insertion for new products.
 * Additionally, it implements authentication and authorization checks for admin users.
 * @module addProductRouter
 */

// Import required modules
const express = require('express');
const router = express.Router();
const fs = require('fs');
const util = require('util');
const parse = require('csv-parse');
const multer = require('multer');
const fastcsv = require("fast-csv");
const AWS = require('aws-sdk');

/**
 * Middleware to check admin login status.
 * @function ensureAdmin
 * @memberof module:addProductRouter
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next middleware function
 * @returns {undefined}
 */
function ensureAdmin(req, res, next) {
    if (req.session.Admin) {
        return next();
    } else {
        res.redirect('/account');
    }
}


// Multer upload configuration
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Handles GET request for displaying add product page.
 * @name GET/addproduct
 * @function
 * @memberof module:addProductRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.get('/addproduct', ensureAdmin, async (req, res) => {
    res.render('addproduct', { title: 'Inventory Management', show_login: true, at_Home: false});
});

/**
 * Handles POST request for adding products to inventory.
 * @name POST/addproduct
 * @function
 * @memberof module:addProductRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.post('/addproduct', ensureAdmin, upload.single('csvFile'), async (req, res) => {
    try {
        const db = req.db;
        const csvData = [];
        // If a CSV file is uploaded
        if (req.file) {
            const csvStream = fastcsv.parse({ headers: true })
                .on("data", function (data) {
                    csvData.push(data);
                })
                .on("end", async function () {
                    for (const record of csvData) {
                        const newProduct = await db.addProduct(
                            record.brand,
                            record.title,
                            record.price,
                            record.sku,
                            record.size,
                            record.stock,
                            record.itemtype,
                            record.condition,
                            record.gender
                        );
                    }
                    res.redirect('/addproduct');
                });
            csvStream.write(req.file.buffer);
            csvStream.end();
        } else {
            // If data is submitted via form
            const pbrand = req.body.brand;
            const ptitle = req.body.title;
            const pprice = req.body.price;
            const psku = req.body.sku;
            const psize = req.body.size;
            const pstock = req.body.stock;
            const pitemtype = req.body.itemtype;
            const pcondition = req.body.condition;
            const pgender = req.body.gender;

            csvData.push({
                brand: pbrand,
                title: ptitle,
                price: pprice,
                sku: psku,
                size: psize,
                stock: pstock,
                type: pitemtype,
                condition: pcondition,
                gender: pgender
            });
            // Insert new products into the database
            for (const record of csvData) {
                const newProduct = await db.addProduct(
                    record.brand,
                    record.title,
                    record.price,
                    record.sku,
                    record.size,
                    record.stock,
                    record.itemtype,
                    record.condition,
                    record.gender
                );
            }
            res.redirect('/addproduct');
        }
    } catch (err) {
        console.error(err);
        res.render('addproduct', { message: err.message });
    }
});

/**
 * Handles POST request for deleting a product.
 * @name POST/product/:id/delete
 * @function
 * @memberof module:addProductRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.post('/product/:id/delete', ensureAdmin, async (req, res) => {
    await req.db.deleteProduct(req.params.id);
    res.redirect('/');
});

/**
 * Export the router for use in other parts of the application.
 * @module.exports
 * @type {object}
 * @memberof module:addProductRouter
 */
module.exports = router;