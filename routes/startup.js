/**
 * Handles GET request for the homepage.
 * @name GET/
 * @function
 * @memberof module:startupRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */

// Import required modules
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Array of brands to filter products
        const brands = ['Jordan', 'Yeezy', 'Nike', 'Supreme', 'Sp5der'];

        // Fetch product brands matching the predefined brands
        const product_brands = await req.db.findByBrands(brands);

        // Fetch all products from the database
        const productsByBrand = await req.db.findAllProducts();

        // Render the homepage template with data
        res.render('homepage', {
            title: 'Homepage',
            show_login: true,
            at_Home: true,
            showSidebar: true,
            product_brands,
            productsByBrand,
            getS3ImageUrl: filename => {
                // AWS S3 configuration
                const s3 = new AWS.S3({
                    accessKeyId: 'AKIATS4FQMQJ2PPI3N5X',
                    secretAccessKey: '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',
                    region: 'us-east-1'
                });

                // S3 bucket and object information
                const bucketName = 'seniorprojectcmps450';
                const objectKey = `images/${filename}`;

                // Generate a signed URL for accessing the image
                const params = {
                    Bucket: bucketName,
                    Key: objectKey,
                };

                return s3.getSignedUrl('getObject', params);
            }
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
 * @memberof module:startupRouter
 */
module.exports = router;
