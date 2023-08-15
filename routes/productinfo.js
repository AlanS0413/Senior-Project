/**
 * Handles GET request for product information.
 * @name GET/:brand/:sku
 * @function
 * @memberof module:productInfoRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */

// Import required modules
const express = require('express');
const router = express.Router();

router.get('/:brand/:sku', async (req, res) => {
    try {
        // Fetch product details by SKU from the database
        const product = await req.db.findProductBySku(req.params.sku);

        // Render the productinfo template with product data
        res.render('productinfo', {
            show_login: true,
            at_Home: false,
            side_bar: true,
            product: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

/**
 * Export the router for use in other parts of the application.
 * @module.exports
 * @type {object}
 * @memberof module:productInfoRouter
 */
module.exports = router;
