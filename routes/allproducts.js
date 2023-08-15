/**
 * @file allproducts.js - Express Router for Displaying All Products
 */

/**
 * This module defines an Express router responsible for handling the route to display all available products.
 * It fetches all products from the database and renders the allproducts template with the retrieved products.
 * @module allProductsRouter
 */

// Import required modules
const express = require('express');
const router = express.Router();

/**
 * Handles GET request for displaying all products.
 * @name GET/allproducts
 * @function
 * @memberof module:allProductsRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.get('/allproducts', async (req, res) => {
    try {
        // Fetch all products from the database
        const allproducts = await req.db.findAllProducts();

        // If no products found, send a 404 response
        if (!allproducts || allproducts.length === 0) {
            res.status(404).send("Coming Soon!");
            return;
        }

        // Render the allproducts template with all retrieved products
        res.render('allproducts', {
            allproducts: allproducts,
            title: "All Products",
            show_login: true,
            at_Home: false,
            showSidebar: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

/**
 * Export the router for use in other parts of the application.
 * @module.exports
 * @type {object}
 * @memberof module:allProductsRouter
 */
module.exports = router;
