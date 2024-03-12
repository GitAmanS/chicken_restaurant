const Cart = require('../models/cartModel');
const Item = require('../models/itemModel');

const cartController = {

// Get user's cart
getCart: async (req, res) => {
  try {
    // Fetch the cart for the logged-in user
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');
    
    // Create a formatted cart array with item id included
    const formattedCart = cart.items.map(({ item, quantity, _id }) => ({
      ...item.toObject(),
      quantity,
      _id: item._id.toString(),  // Convert ObjectId to string
      // Include the item id
    }));

    // Include total quantity in the response
    res.json({ formattedCart, total: cart.cartTotal() });
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},



// Add an item to the cart
addItemToCart: async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    // Check if the item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Fetch the user's cart with item details
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.item');

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ user: req.user._id });
    }

    // Add the item to the cart
    await cart.addItemToCart(itemId, quantity);

    // Recalculate the total after adding the item
    let cartTotal = await cart.cartTotal();

    // Save the cart after calculating the total
    await cart.save();

    res.json({ total: cartTotal });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},


  // Remove an item from the cart
  removeItemFromCart: async (req, res) => {
    try {
      const itemId = req.params.itemId;

      // Fetch the user's cart with item details
      const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');

      // If the cart exists, remove the item
      if (cart) {
        cart.items = cart.items.filter((cartItem) => !cartItem.item.equals(itemId));
        await cart.save();
      }

      // Recalculate the total after removing the item
      let cartTotal = await cart.cartTotal();

      res.json({ total: cartTotal });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = cartController;
