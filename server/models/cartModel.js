const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, default: 0 }, // New field for total

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Method to add an item to the cart
cartSchema.methods.addItemToCart = function (itemId, quantity = 1) {
  const existingItem = this.items.find((cartItem) => cartItem.item.equals(itemId));

  if (existingItem) {
    // If the item is already in the cart, update the quantity
    existingItem.quantity += quantity;
  } else {
    // Otherwise, add a new item to the cart
    this.items.push({ item: itemId, quantity });
  }

  // Recalculate the total after adding the item
  this.total = this.items.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

  return this.save();
};

cartSchema.methods.cartTotal = function() {
  return this.items.reduce((sum, cartItem) => {
    const { price } = cartItem.item;
    return sum + price * cartItem.quantity;
  }, 0);
}


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
