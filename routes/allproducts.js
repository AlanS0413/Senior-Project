const express = require('express')
const router = express.Router();


router.get('/allproducts', async (req, res) => {
    const allproducts = await req.db.findAllProducts();

  if (!allproducts || allproducts.length === 0) {
    res.status(404).send("Coming Soon!");
    return;
  }

  res.render('allproducts', { allproducts: allproducts, title: "All Products", show_login: true, at_Home: false, showSidebar: true });
});



module.exports = router;