const express = require('express');
const router = express.Router();

const user = require('../controllers/users.controller');
const product = require('../controllers/products.controller');
const cart = require('../controllers/carts.controller');
const wishlist = require('../controllers/wishlist.controller');
const order = require('../controllers/orders.controller');
const email = require('../controllers/emails.controller');
const search = require('../controllers/search.controller');

const upload = require("../config/multer.config");



// User routes
router.post("/users", upload.single("avatar"), user.create);
router.post("/users/login", user.login);
router.post("/users/logout", user.logout);
router.patch("/users/:id", user.updateAddress);


// Product routes
router.post("/products", upload.single("img"), product.create);
router.get("/products", product.list);
router.get("/products/:id", product.detail);
router.delete("/products/:id", product.delete);

// Cart routes
router.get("/carts/:userId", cart.getCartByUserId);
router.post("/carts/:cartId/add-to-cart/:productId", cart.addToCart);
router.post("/carts/:cartId/remove-from-cart/:productId", cart.removeFromCart);
router.patch("/carts/:cartId/update-quantity/:productId", cart.updateCartQuantity);

// Wishlist routes
router.get("/wishlist/:userId", wishlist.getWishlistByUserId);
router.post("/wishlist/:wishlistId/add-to-wishlist/:productId", wishlist.addToWishlist);
router.post("/wishlist/:wishlistId/remove-from-wishlist/:productId", wishlist.removeFromWishlist);


// Order routes
router.post("/orders/:userId/create", order.createOrderFromCart);
router.get("/orders" , order.getAllOrders)
router.get("/orders/:userId", order.getOrdersByUserId);
router.patch("/orders/:id", order.updateOrder);


// Emails
router.post("/send-email", email.sendEmail);

// Search
router.get("/search", search.search);



module.exports = router;