const express = require('express')
const router = express.Router();


router.get('/:brand/:sku', async (req, res) => {
    const product = await req.db.findProductBySku(req.params.sku);
    res.render('productinfo', { show_login: true, at_Home: false, side_bar: true, product: product});
});




module.exports = router;