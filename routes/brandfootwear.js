/**
 * @file brandfootware.js - Express Router for Displaying Brand Footwear
 */

/**
 * This module defines an Express router responsible for handling the route to display footwear products of a specific brand.
 * It fetches footwear products associated with the provided brand name, converts the brand name to lowercase for querying,
 * and renders the brandtypes template with the retrieved brand footwear products.
 * @module brandFootwearRouter
 */

// Import required modules
const express = require('express');
const router = express.Router();

/**
 * Handles GET request for displaying brand footwear products.
 * @name GET/Footwear/:brand
 * @function
 * @memberof module:brandFootwearRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.get('/Footwear/:brand', async (req, res) => {
    try {
        // Preserve the original brand name from the request parameters
        const originalBrand = req.params.brand;

        // Convert the brand name to lowercase for database query
        const brand = originalBrand.toLowerCase();

        // Fetch footwear products associated with the specified brand
        const brandProduct = await req.db.findProductByBrandAndType(brand, 'f');

        // Use the original brand name in the title
        res.render('brandtypes', {
            brandProduct: brandProduct,
            title: `${originalBrand}`,
            show_login: true,
            at_Home: false
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
 * @memberof module:brandFootwearRouter
 */
module.exports = router;
