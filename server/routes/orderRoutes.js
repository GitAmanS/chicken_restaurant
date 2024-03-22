const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Import middleware for authentication if needed
const authenticateUser = require('../middleware/authenticateUser');
// Define route for creating order and processing payment
router.get('/checkout', authenticateUser, orderController.createOrder);
router.post('/paymentverification', authenticateUser, orderController.paymentVarification);
router.get('/getAllOrders', authenticateUser, orderController.getAllOrders);
router.post('/updateOrderStatus', authenticateUser, orderController.updateOrderStatus)

module.exports = router;
