const express = require('express')
const router = express.Router();


router.get('/cart', async (req, res) => {
    const cartItems = await req.db.getCart(req.session.id)
    const inventory = await req.db.findAllProducts();
    const totalPrice = cartItems.reduce((total, product) => {

        return total + (product.price * product.quantity);
    }, 0);

    res.render('cart', {cartItems:cartItems, inventory:inventory, totalPrice:totalPrice, title: 'Cart', show_login: true, at_Home: false});
});

router.get('/api/cart', async (req, res) => {
    const cartItems = await req.db.getCart(req.session.id);
    res.json({ cartItems: cartItems, cart_id: req.session.id });
});

router.post('/cart', async (req, res) => {
    const size = req.body.size;
    const price = req.body.price;
    const quantity = parseInt(req.body.quantity);
    const cart_id = req.session.id;
    const itemName = req.body.title
    const sku = req.body.sku
    const brand = req.body.brand
    const stock = req.body.stock

    try {
        const existingItem = await req.db.getItemFromCart(cart_id, itemName, quantity, size, price, sku);

        if (existingItem) {
            // Calculate the new quantity
            const newQuantity = quantity;

            // If the new quantity is less than or equal to the stock
            if(existingItem.quantity + 1 <= stock){
                // Update the quantity
                await req.db.updateItemQuantity(cart_id, itemName, size, sku, newQuantity);
            }
        } else {
            // If the item does not exist in the cart, add it
            await req.db.addToCart(cart_id, itemName, quantity, size, price, sku, brand, stock);
        }

        res.redirect(req.headers.referer);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

router.post('/transaction-success', async (req, res) => {
    const transactionData = req.body.transactionData;
    const transactionItems = transactionData.purchase_units[0].items

    req.session.checkoutComplete = true;

    req.session.transactionData = transactionData;

    try {
        // Loop over each item in the transaction
        for(let item of transactionItems) {
            // Get the current inventory count for the item
            const currentItem = await req.db.findProductBySku(item.sku);

            // Calculate the new inventory count
            const newQuantity = currentItem.stock - item.quantity;

            // Update the inventory count in the database
            await req.db.reduceProductStock(item.sku, item.quantity);
        }

        // Clear the cart after successful transaction
        await req.db.clearCart(req.session.id);

        // Send response with redirectUrl
        res.json({ redirectUrl: `/checkoutsuccess` });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred when updating inventory');
    }
});


router.get('/api/cart/:cart_id', async (req, res) => {
    // Retrieve cart_id from request parameters
    const cart_id = req.session.id;
    const product = req.params.title;
    const size = req.params.size;
    const sku = req.params.sku;
    const price = req.params.price;
    const quantity = req.params.quantity;

    // Call get cart items
    const cartItems = await req.db.getItemFromCart(cart_id, product, quantity, size, price, sku);

    // Send cart items as JSON response
    res.json(cartItems);
});


router.post('/cart/:sku/:size', async (req, res) => {
    await req.db.removeFromCart(req.session.id, req.params.sku,req.params.size);
    res.redirect('/cart');
});


module.exports = router;