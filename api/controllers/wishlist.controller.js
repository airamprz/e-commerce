const Wishlist = require("../models/wishlist.model");
const Product = require("../models/product.model");

module.exports.getWishlistByUserId = (req, res, next) => {
    Wishlist.findOne({ user: req.params.userId })
        .populate("items.product")
        .then((wishlist) => {
            if (wishlist) {
                res.json(wishlist);
            } else {
                res.status(404).json({ error: "Wishlist not found" });
            }
        })
        .catch(next);
}

module.exports.addToWishlist = (req, res, next) => {
    Product.findById(req.params.productId)
        .then((product) => {
            if (product) {
                return Wishlist.findByIdAndUpdate(
                    req.params.wishlistId,
                    { $push: { items: { product: product._id } } },
                    { new: true, upsert: true }
                );
            } else {
                res.status(404).json({ error: "Product not found" });
            }
        })
        .then((updatedWishlist) => {
            if (updatedWishlist) {
                return Wishlist.findByIdAndUpdate(
                    updatedWishlist._id,
                    { total: updatedWishlist.items.length },
                    { new: true }
                ).populate("items.product");
            } else {
                res.status(404).json({ error: "Wishlist not found" });
            }
        })
        .then((updatedWishlist) => res.json(updatedWishlist))
        .catch(next);
}

module.exports.removeFromWishlist = (req, res, next) => {
    Wishlist.findOneAndUpdate(
        { _id: req.params.wishlistId },
        { $pull: { items: { product: req.params.productId } } },
        { new: true }
    )
        .then((updatedWishlist) => {
            if (updatedWishlist) {
                return Wishlist.findByIdAndUpdate(
                    updatedWishlist._id,
                    { total: updatedWishlist.items.length },
                    { new: true }
                ).populate("items.product");
            } else {
                res.status(404).json({ error: "Wishlist not found" });
            }
        })
        .then((updatedWishlist) => res.json(updatedWishlist))
        .catch(next);
};