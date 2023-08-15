/**
 * @file brands.js - Express Router for Displaying Brand Products
 */

/**
 * This module defines an Express router responsible for handling the route to display products of a specific brand.
 * It fetches products associated with the provided brand name, converts the brand name to lowercase for querying,
 * and renders the brandproducts template with the retrieved brand products.
 * @module brandProductsRouter
 */

// Import required modules
const express = require('express');
const router = express.Router();

/**
 * Handles GET request for displaying brand products.
 * @name GET/:brand
 * @function
 * @memberof module:brandProductsRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.get('/:brand', async (req, res) => {
    try {
        // Preserve the original brand name from the request parameters
        const originalBrand = req.params.brand;

        // Convert the brand name to lowercase for database query
        const brand = originalBrand.toLowerCase();

        // Fetch products associated with the specified brand
        const brandProducts = await req.db.findByBrands(brand);

        // If no products found for the brand, send a 404 response
        if (!brandProducts || brandProducts.length === 0) {
            res.status(404).send("Coming Soon!");
            return;
        }

        // Render the brandproducts template with brand products and original brand name
        res.render('brandproducts', {
            brandProducts: brandProducts,
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
 * @memberof module:brandProductsRouter
 */
module.exports = router;
