const Razorpay = require('razorpay');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const crypto =require("crypto")
// Initialize Razorpay with your API key and secret
const razorpay = new Razorpay({
    key_id: 'rzp_test_wud5i0vu3P18BR',
    key_secret: 'xYwij6dPjVem474yji5I5fXy'
});

// Controller function to create a new order and process payment
const createOrder = async (req, res) => {
    try {
        console.log('User details:', req.user); // Debug statement to log user details

        // Get user's cart
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');

        // Check if cart exists
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        // Calculate total price from cart
        const totalPrice = cart.cartTotal();
        // Get user's cart
        // const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');

        // // Check if cart exists
        // if (!cart) {
        //     return res.status(404).json({ message: 'Cart not found' });
        // }

        // // Calculate total price from cart
        // const totalPrice = cart.cartTotal();

        // // Create a new order instance
        // const newOrder = new Order({
        //     user: req.user._id,
        //     items: cart.items.map(item => ({ item: item.item._id, quantity: item.quantity })),
        //     totalPrice: totalPrice,
        //     // Add other fields as needed
        // });

        // // Save the order to the database
        // const savedOrder = await newOrder.save();

        // Generate Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: totalPrice * 100, // Razorpay amount is in paisa (1 Rupee = 100 Paisa)
            currency: 'INR', // Currency code (e.g., INR for Indian Rupees)
            // receipt: savedOrder._id.toString(), // Unique identifier for the order
            payment_capture: 1 // Automatically capture the payment when it's authorized
        });

        res.json({ order: razorpayOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const paymentVarification = async(req,res) => {
    try {
        console.log(req.body);
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        } = req.body.response;
        console.log("id", razorpay_order_id);
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const resultSign = crypto
            .createHmac("sha256", "xYwij6dPjVem474yji5I5fXy")
            .update(sign.toString())
            .digest("hex");

        console.log("razorpay signature:", razorpay_signature, " sign:", resultSign);

        if (razorpay_signature == resultSign) {
            console.log("success");
            // Get user's cart and populate the item details
            const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');

            // Check if cart exists
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Calculate total price from cart
            const totalPrice = cart.cartTotal();

            // Create a new order instance with item details including names
            const newOrder = new Order({
                user: req.user._id,
                items: cart.items.map(item => ({ 
                    item: item.item._id, 
                    quantity: item.quantity, 
                    name: item.item.title // Include the item name
                })),
                totalPrice: totalPrice,
                // Add other fields as needed
            });

            // Save the order to the database
            const savedOrder = await newOrder.save();
            console.log(savedOrder);
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            console.log("not valid");
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};


// Controller function to get all orders of a user
const getAllOrders = async (req, res) => {
    try {
        // Find all orders associated with the user's ID
        const orders = await Order.find({ user: req.user._id });

        // Check if any orders were found
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        // Send the fetched orders as a response
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createOrder, paymentVarification, getAllOrders };
