const shortid = require('shortid');
const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const Wishlist = require('../models/wishlist.model');

module.exports.create = async (req, res, next) => {
    try {
        const referralCode = shortid.generate();

        const referredByUser = await User.findOne({ referralCode: req.body.referralCode });

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            referralCode: referralCode,
            referredBy: referredByUser ? referredByUser.id : null,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode,
            country: req.body.country,
        });

        await user.save();

        const cart = new Cart({
            user: user.id,
            products: [],
        });
        await cart.save();

        const wishlist = new Wishlist({
            user: user.id,
            products: [],
        });
        await wishlist.save();

        res.status(201).json(user);
    } catch (error) {
        // Manejo de errores
        console.error(error);
        next(error);
    }
};



module.exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                user.checkPassword(req.body.password)
                    .then(match => {
                        if (match) {
                            req.session.userId = user.id
                            res.json(user)
                        } else {
                            res.status(404).json({ error: 'user not found' })
                        }
                    })
            } else {
                res.status(404).json({ error: 'user not found' })
            }
        })
        .catch(next)
}

module.exports.logout = (req, res, next) => {
    req.session.destroy()
    res.status(204).json()
}

module.exports.updateAddress = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ error: 'user not found' })
            }
        })
        .catch(next)
}