const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const User = require('../models/user.model');

module.exports.createOrderFromCart = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (user && cart) {
      const order = new Order({
        user: userId,
        items: cart.items,
        total: cart.total,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country,
      });

      await order.save();
      await Cart.findByIdAndDelete(cart.id);

      const newCart = new Cart({ user: userId });
      await newCart.save();

      res.json(order);
    } else {
      res.status(404).json({ error: 'user or cart not found' });
    }
  } catch (error) {
    console.error('Error al crear la orden:', error);
    next(error);
  }
};

module.exports.getAllOrders = (req, res, next) => {
    Order.find()
        .populate('items.product')
        .populate('user')
        .then(orders => res.json(orders))
        .catch(next)
}

module.exports.getOrdersByUserId = (req, res, next) => {
    Order.find({ user: req.params.userId })
        .populate('items.product')
        .then(orders => res.json(orders))
        .catch(next)
}

module.exports.updateOrder = (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => {
            if (order) {
                if (req.body.status) {
                    order.status = req.body.status;
                }
                return order.save()
                    .then(() => {
                        res.json(order);
                    })
            } else {
                res.status(404).json({ error: 'order not found' });
            }
        })
        .catch(error => {
            console.error("Error al actualizar la orden:", error);
            next(error);
        });
}
