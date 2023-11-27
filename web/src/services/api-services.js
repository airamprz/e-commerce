import axios from 'axios';

const service = axios.create({
    baseURL:  "http://localhost:3000/v1",
    withCredentials: true
});


// users
export function createUser(body) {
    return service.post("/users", body).then((response) => response.data);
}

export function login (body) {
    return service.post("/users/login", body).then((response) => response.data);
}

export function logoutApi () {
    return service.post("/users/logout").then((response) => response.data);
}

export function updateAddress (id, body) {
    return service.patch(`/users/${id}`, body).then((response) => response.data);
}

// products
export function createProduct (body) {
    return service.post("/products", body).then((response) => response.data);
}
export function listProducts () {
    return service.get("/products").then((response) => response.data);
}

export function detailProduct (id) {
    return service.get(`/products/${id}`).then((response) => response.data);
}
/*
export function deleteProduct (id) {
    return service.delete(`/products/${id}`).then((response) => response.data);
}
*/

// carts
export function getCartByUserId (userId) {
    return service.get(`/carts/${userId}`).then((response) => response.data);
}

export function addToCart (cartId, productId, size) {
    return service.post(`/carts/${cartId}/add-to-cart/${productId}`, {size}).then((response) => response.data);
}

export function removeFromCart (cartId, productId) {
    return service.post(`/carts/${cartId}/remove-from-cart/${productId}`).then((response) => response.data);
}

export function updateCartQuantity (cartId, productId, quantity) {
    return service.patch(`/carts/${cartId}/update-quantity/${productId}`, {quantity}).then((response) => response.data);
}

// wishlist
export function getWishlistByUserId (userId) {
    return service.get(`/wishlist/${userId}`).then((response) => response.data);
}

export function addToWishlist (wishlistId, productId) {
    return service.post(`/wishlist/${wishlistId}/add-to-wishlist/${productId}`).then((response) => response.data);
}

export function removeFromWishlist (wishlistId, productId) {
    return service.post(`/wishlist/${wishlistId}/remove-from-wishlist/${productId}`).then((response) => response.data);
}

// orders
export function createOrderFromCart (userId) {
    return service.post(`/orders/${userId}/create`).then((response) => response.data);
}

export function getAllOrders () {
    return service.get(`/orders`).then((response) => response.data);
}

export function getOrdersByUserId (userId) {
    return service.get(`/orders/${userId}`).then((response) => response.data);
}

export function updateOrder (id, status) {
    return service.patch(`/orders/${id}`, {status}).then((response) => response.data);
}



// emails
export function sendEmail (email) {
    return service.post("/send-email", email).then((response) => response.data);
}


// search
export function search (term) {
    return service.get(`/search?term=${term}`)
        .then((response) => {
            console.log(response.data); 
            return response.data;
        });
}