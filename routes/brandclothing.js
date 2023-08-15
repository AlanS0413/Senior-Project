/**
 * @file brandclothing.js - Express Router for Displaying Brand Clothing
 */

/**
 * This module defines an Express router responsible for handling the route to display clothing products of a specific brand.
 * It fetches clothing products associated with the provided brand name, converts the brand name to lowercase for querying,
 * and renders the brandtypes template with the retrieved brand clothing products.
 * @module brandClothingRouter
 */

// Import required modules
const express = require('express');
const router = express.Router();

/**
 * Handles GET request for displaying brand clothing products.
 * @name GET/Clothing/:brand
 * @function
 * @memberof module:brandClothingRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.get('/Clothing/:brand', async (req, res) => {
    try {
        // Preserve the original brand name from the request parameters
        const originalBrand = req.params.brand;

        // Convert the brand name to lowercase for database query
        const brand = originalBrand.toLowerCase();

        // Fetch clothing products associated with the specified brand
        const brandProduct = await req.db.findProductByBrandAndType(brand, 'c');

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
 * @memberof module:brandClothingRouter
 */
module.exports = router;
