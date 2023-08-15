/**
 * Handles GET request for checkout success.
 * @name GET/checkoutsuccess
 * @function
 * @memberof module:checkoutSuccessRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */

// Import required modules
const express = require('express');
const router = express.Router();

router.get('/checkoutsuccess', async (req, res) => {
    try {
        // Check if the checkout process is complete
        if (req.session.checkoutComplete) {
            // Retrieve transaction and shipping details from the session
            const transactionData = req.session.transactionData;
            const transactionItems = transactionData.purchase_units[0].items;
            const transactionShipping = transactionData.purchase_units[0].shipping;

            // Clear the user's cart after a successful transaction
            await req.db.clearCart(req.session.id);

            // Render the checkout success page with transaction and shipping details
            res.render('checkoutsuccess', {
                transactionItems: transactionItems,
                transactionShipping: transactionShipping
            });
        } else {
            // Redirect to the homepage if checkout is not complete
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

/**
 * Export the router for use in other parts of the application.
 * @module.exports
 * @type {object}
 * @memberof module:checkoutSuccessRouter
 */
module.exports = router;
