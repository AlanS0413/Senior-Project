/**
 * @file cart.js - Express Router for Cart Operations
 */

/**
 * This module defines an Express router responsible for handling various cart-related operations.
 * It includes routes for displaying the cart, managing cart items, and processing transactions.
 * @module cartRouter
 */

// Import required modules
const express = require('express');
const router = express.Router();

/**
 * Handles GET request for displaying the cart.
 * @name GET/cart
 * @function
 * @memberof module:cartRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.get('/cart', async (req, res) => {
    try {
        // Fetch cart items and inventory from the database
        const cartItems = await req.db.getCart(req.session.id);
        const inventory = await req.db.findAllProducts();

        // Calculate total price of cart items
        const totalPrice = cartItems.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);

        // Render the cart page with cart items, inventory, and total price
        res.render('cart', {
            cartItems: cartItems,
            inventory: inventory,
            totalPrice: totalPrice,
            title: 'Cart',
            show_login: true,
            at_Home: false
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

/**
 * Handles GET request for fetching cart items via API.
 * @name GET/api/cart
 * @function
 * @memberof module:cartRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.get('/api/cart', async (req, res) => {
    try {
        const cartItems = await req.db.getCart(req.session.id);
        res.json({ cartItems: cartItems, cart_id: req.session.id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Handle POST request for adding items to the cart
/**
 * Handles POST request for adding items to the cart.
 * @name POST/cart
 * @function
 * @memberof module:cartRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.post('/cart', async (req, res) => {
    try {
        // Extract item details from the request body
        const size = req.body.size;
        const price = req.body.price;
        const quantity = parseInt(req.body.quantity);
        const cart_id = req.session.id;
        const itemName = req.body.title;
        const sku = req.body.sku;
        const brand = req.body.brand;
        const stock = req.body.stock;

        // Check if the item already exists in the cart
        const existingItem = await req.db.getItemFromCart(cart_id, itemName, quantity, size, price, sku);

        if (existingItem) {
            // Calculate the new quantity
            const newQuantity = quantity;

            // If the new quantity is less than or equal to the stock
            if (existingItem.quantity + 1 <= stock) {
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
    try {
        // Retrieve transaction data from request body
        const transactionData = req.body.transactionData;
        const transactionItems = transactionData.purchase_units[0].items;

        // Set checkoutComplete flag and store transactionData in session
        req.session.checkoutComplete = true;
        req.session.transactionData = transactionData;

        // Loop over each item in the transaction
        for (let item of transactionItems) {
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

/**
 * Handles GET request for fetching cart items by cart_id via API.
 * @name GET/api/cart/:cart_id
 * @function
 * @memberof module:cartRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.get('/api/cart/:cart_id', async (req, res) => {
    try {
        // Retrieve cart_id from session and other parameters from request
        const cart_id = req.session.id;
        const product = req.params.title;
        const size = req.params.size;
        const sku = req.params.sku;
        const price = req.params.price;
        const quantity = req.params.quantity;

        // Call getItemFromCart to retrieve cart items
        const cartItems = await req.db.getItemFromCart(cart_id, product, quantity, size, price, sku);

        // Send cart items as JSON response
        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

/**
 * Handles POST request for removing items from the cart.
 * @name POST/cart/:sku/:size
 * @function
 * @memberof module:cartRouter
 * @inner
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {undefined}
 */
router.post('/cart/:sku/:size', async (req, res) => {
    try {
        // Remove item from the cart by SKU and size
        await req.db.removeFromCart(req.session.id, req.params.sku, req.params.size);

        // Redirect to the cart page after removal
        res.redirect('/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

/**
 * Export the router for use in other parts of the application.
 * @module.exports
 * @type {object}
 * @memberof module:cartRouter
 */
module.exports = router;