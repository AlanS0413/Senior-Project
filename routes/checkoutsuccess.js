const express = require('express')
const router = express.Router();
const paypal = require('@paypal/checkout-server-sdk');



router.get('/checkoutsuccess', async (req, res) => {
    if (req.session.checkoutComplete) {
    const transactionData = req.session.transactionData;
    const transactionItems = transactionData.purchase_units[0].items
    const transactionShipping = transactionData.purchase_units[0].shipping

    // Clear the cart after successful transaction
    await req.db.clearCart(req.session.id);

    // Render the checkout success page with the transaction and shipping details
    res.render('checkoutsuccess', {transactionItems:transactionItems, transactionShipping:transactionShipping });}
    else {
        res.redirect('/');
    }
});


module.exports = router;