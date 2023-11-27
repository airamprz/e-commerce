const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
      },
      quantity: {
        type: Number,
        default: 1, 
      },
      size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL'],
        default: 'M',
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
