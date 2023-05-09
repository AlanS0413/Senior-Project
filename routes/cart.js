const express = require('express')
const router = express.Router();

router.get('/cart', async (req, res) => {
    res.render('cart', { title: 'Cart', show_login: true, at_Home: false });
});

module.exports = router;