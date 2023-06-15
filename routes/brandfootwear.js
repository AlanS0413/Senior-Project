const express = require('express')
const router = express.Router();


router.get('/Footwear/:brand', async (req, res) => {
    const originalBrand = req.params.brand;

    // Convert the brand to lowercase for the database query
    const brand = originalBrand.toLowerCase();

    const brandProduct = await req.db.findProductByBrandAndType(brand, 'f');



    // Use the original brand name in the title
    res.render('brandtypes', { brandProduct: brandProduct, title: `${originalBrand}`, show_login: true, at_Home: false});
  });


module.exports = router;