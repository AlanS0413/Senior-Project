const express = require('express')
const router = express.Router();



router.get('/cart', async (req, res) => {
    const cartItems = await req.db.getCartItems(req.session.id)
    const inventory = await req.db.findAllProducts();
    const totalPrice = cartItems.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    res.render('cart', {cartItems:cartItems, inventory:inventory, totalPrice:totalPrice, title: 'Cart', show_login: true, at_Home: false});
});

router.post('/cart', async (req, res) => {
    const size = req.body.size;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const cart_id = req.session.id;
    const itemName = req.body.title
    const sku = req.body.sku
    const brand = req.body.brand
    const stock = req.body.stock
    console.log("cart_id:", cart_id);
    console.log("price:", price);
    console.log("itemName:", itemName);
    // Check if the item is already in the cart
    // const existingItem = await req.db.getItemFromCart(cart_id, product);
    // console.log(existingItem, "existingItem");

    // if (existingItem) {
    //     // If the item is already in the cart, update the quantity
    //     await req.db.updateItemQuantity(cart_id, product, existingItem + product);
    // } else {
        // If the item is not in the cart, add it as a new item
        await req.db.addToCart(cart_id ,itemName, quantity, size, price, sku, brand, stock);
    // }

    res.redirect(req.headers.referer);
});



module.exports = router;