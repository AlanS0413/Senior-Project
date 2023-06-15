const express = require('express')
const router = express.Router();



router.get('/cart', async (req, res) => {
    res.render('cart', { title: 'Cart', show_login: true, at_Home: false});
});

router.post('/cart', async (req, res) => {
    const addItem = req.db.findAllProducts();
    res.json({addItem: addItem});
});



// app.post('/cart', function(req, res) {
   

//     // Get the user's cart (e.g., from a database or the user's session)
//     let cart = getUserCart();

//     // Add the product to the cart
//     cart.push({
//         sku,
//         brand,
//         title,
//         size,
//         condition,
//         quantity: parseInt(quantity, 10),
//     });

//     // Save the user's cart (e.g., to a database or the user's session)
//     saveUserCart(cart);

//     // Redirect the user back to the product page (or to the cart page)
//     res.redirect('./routes/startup');
// });

module.exports = router;