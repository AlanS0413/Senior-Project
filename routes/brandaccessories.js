/**
 * @file brandaccessories.js - Express Router for Displaying Brand Accessories
 */

/**
 * This module defines an Express router responsible for handling the route to display accessories products of a specific brand.
 * It fetches accessories products associated with the provided brand name, converts the brand name to lowercase for querying,
 * and renders the brandtypes template with the retrieved brand accessories products.
 * @module brandAccessoriesRouter
 */

// Import required modules
const express = require('express');
const router = express.Router();

/**
 * Handles GET request for displaying brand accessories products.
 * @name GET/Accessories/:brand
 * @function
 * @memberof module:brandAccessoriesRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.get('/Accessories/:brand', async (req, res) => {
    try {
        // Preserve the original brand name from the request parameters
        const originalBrand = req.params.brand;

        // Convert the brand name to lowercase for database query
        const brand = originalBrand.toLowerCase();

        // Fetch accessories products associated with the specified brand
        const brandProduct = await req.db.findProductByBrandAndType(brand, 'a');

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
 * @memberof module:brandAccessoriesRouter
 */
module.exports = router;
