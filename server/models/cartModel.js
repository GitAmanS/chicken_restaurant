const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  // Add other fields as needed

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

  return this.save();
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
