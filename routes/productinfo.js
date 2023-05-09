const express = require('express')
const router = express.Router();


router.get('/id', async (req, res) => {
    // const product = await req.db.findProductByid(req.params.id);
    // console.log(product);
    // if (!product) {
    //   res.status(404).send("Product not found");
    //   return;
    // }
    res.render('productinfo', { show_login: true, at_Home: false});
});




module.exports = router;