const Cart = require('../models/cart.model')
const Product = require('../models/product.model')

module.exports.getCartByUserId = (req, res, next) => {
    Cart.findOne({ user: req.params.userId })
        .populate('items.product')
        .then(cart => {
            if (cart) {
                res.json(cart);
            } else {
                res.status(404).json({ error: 'Carrito no encontrado' });
            }
        })
        .catch(next);
}

module.exports.addToCart = (req, res, next) => {
    let product;

    Product.findById(req.params.productId)
        .then(foundProduct => {
            product = foundProduct;
            if (product) {
                const { size } = req.body;
                return Cart.findByIdAndUpdate(
                    req.params.cartId,
                    { $push: { items: { product: product._id, size } } },
                    { new: true, upsert: true }
                );
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }
        })
        .then(updatedCart => {
            if (updatedCart) {
                const newTotal = updatedCart.total + product.price;
                return Cart.findByIdAndUpdate(
                    updatedCart._id,
                    { total: newTotal },
                    { new: true }
                ).populate('items.product');
            } else {
                res.status(404).json({ error: 'Carrito no encontrado' });
            }
        })
        .then(updatedCart => res.json(updatedCart))
        .catch(next);
};

module.exports.removeFromCart = (req, res, next) => {
    Cart.findOneAndUpdate(
        { _id: req.params.cartId },
        { $pull: { items: { product: req.params.productId } } },
        { new: true }
    )
        .then(updatedCart => {
            if (updatedCart) {
                const newTotal = updatedCart.items.reduce((total, item) => total + item.product.price, 0);
                return Cart.findByIdAndUpdate(
                    updatedCart._id,
                    { total: newTotal },
                    { new: true }
                ).populate('items.product');
            } else {
                res.status(404).json({ error: 'Carrito no encontrado' });
            }
        })
        .then(updatedCart => res.json(updatedCart))
        .catch(next);
}

module.exports.updateCartQuantity = (req, res, next) => {
    Cart.findOne({ _id: req.params.cartId, 'items.product': req.params.productId })
        .populate('items.product')
        .then(cart => {
            if (cart) {
                const item = cart.items.find(item => item.product._id.toString() === req.params.productId);

                if (isNaN(req.body.quantity)) {
                    return res.status(400).json({ error: 'La cantidad debe ser un número válido.' });
                }

                const newQuantity = parseInt(req.body.quantity);

                if (newQuantity <= 0) {
                    return res.status(400).json({ error: 'La cantidad debe ser un número positivo.' });
                }

                const newTotal = cart.total - item.product.price * item.quantity + item.product.price * newQuantity;

                item.quantity = newQuantity;

                return Cart.findByIdAndUpdate(
                    cart._id,
                    { $set: { 'items': cart.items, 'total': newTotal } },
                    { new: true }
                ).populate('items.product');
            } else {
                res.status(404).json({ error: 'Carrito no encontrado' });
            }
        })
        .then(updatedCart => res.json(updatedCart))
        .catch(next);
}
