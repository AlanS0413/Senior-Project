const express = require('express')
const router = express.Router();


router.get('/:brand', async (req, res) => {
  // Preserve the original brand name
  const originalBrand = req.params.brand;

  // Convert the brand to lower case for the database query
  const brand = originalBrand.toLowerCase();

  const brandProducts = await req.db.findByBrands(brand);

  if (!brandProducts || brandProducts.length === 0) {
    res.status(404).send("Coming Soon!");
    return;
  }
  // Use the original brand name in the title
  res.render('brandproducts', { brandProducts: brandProducts, title: `${originalBrand}`, show_login: true, at_Home: false });
});



module.exports = router;