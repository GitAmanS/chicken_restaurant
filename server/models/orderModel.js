const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      name: { type: String, required: true },
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Example: 'Pending', 'Completed', 'Cancelled'
  // Add other fields as needed
  address: { // Adding the address field
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Method to calculate the total price based on item prices and quantities
orderSchema.methods.calculateTotalPrice = function () {
  return this.items.reduce((total, orderItem) => {
    const itemPrice = orderItem.item.price || 0;
    return total + itemPrice * orderItem.quantity;
  }, 0);
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
