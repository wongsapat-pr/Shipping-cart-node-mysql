const express = require('express');
const productRoute = express.Router();
const productController = require('../controllers/product.controller');

// Get All Product
productRoute.get('/', productController.findAll);

// Retrieve a single Product with id
productRoute.get('/:id', productController.findById);

// Create a new Product
productRoute.post('/create', productController.create);

// Update a Product with id
productRoute.put('/:id', productController.update);

// Delete a Product with id
productRoute.delete('/:id', productController.delete);

module.exports = productRoute;