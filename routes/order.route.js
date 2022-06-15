const express = require('express');
const cartRoute = express.Router();
const orderController = require('../controllers/order.controller');

// Retrieve a single Product with id
cartRoute.get('/getcart', orderController.findByorderId);

// Add product to cart
cartRoute.post('/add', orderController.addItemtoCart);

// Checkout order
cartRoute.post('/checkout', orderController.confirmOrder);

module.exports = cartRoute;