const express = require('express')
const router = express.Router();


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            // handle error
            console.error('Error destroying session:', err);
            res.status(500).send('Error occurred during logout');
        } else {
            res.redirect('/');
        }
    });
});


module.exports = router;