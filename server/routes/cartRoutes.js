const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticateUser = require('../middleware/authenticateUser');

// Route to get user's cart
router.get('/cart', authenticateUser,  cartController.getCart);

// Route to add an item to the cart
router.post('/cart/add/:itemId',authenticateUser,  cartController.addItemToCart);

// Route to remove an item from the cart
router.delete('/cart/remove/:itemId',authenticateUser,  cartController.removeItemFromCart);

module.exports = router;
