const express = require('express');
const cartRoute = express.Router();
const orderController = require('../controllers/order.controller');

// Get All order
cartRoute.get('/', orderController.findAll);

// Retrieve a single order with id
cartRoute.get('/:id', orderController.findByorderId);

// Add product to cart
cartRoute.post('/add', orderController.addItemtoCart);

// Checkout order
cartRoute.post('/checkout', orderController.confirmOrder);

module.exports = cartRoute;