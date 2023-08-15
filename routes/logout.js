/**
 * Handles GET request for user logout.
 * @name GET/logout
 * @function
 * @memberof module:logoutRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */

// Import required modules
const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    try {
        // Destroy the user session
        req.session.destroy(err => {
            if (err) {
                // Handle error if session destruction fails
                console.error('Error destroying session:', err);
                res.status(500).send('Error occurred during logout');
            } else {
                // Redirect to the homepage after successful logout
                res.redirect('/');
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
 * @memberof module:logoutRouter
 */
module.exports = router;
