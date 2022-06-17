const express = require('express');
const productRoute = express.Router();
const productController = require('../controllers/product.controller');

// Get All Product
productRoute.get('/', productController.findAll);

// Get Product by filter&Pagination
productRoute.get('/get', productController.findAllWithPage);

// Get Product by Amount
// productRoute.get('/getamount', productController.findAllWithAmount);

// Product Search
productRoute.get('/search', productController.search)

// Create a new Product
productRoute.post('/create', productController.create);

// Retrieve a single Product with id
productRoute.get('/:id', productController.findById);

// Update a Product with id
productRoute.put('/:id', productController.update);

// Delete a Product with id
productRoute.delete('/:id', productController.delete);

module.exports = productRoute;