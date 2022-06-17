const express = require('express');
const adminRoute = express.Router();
const adminController = require('../controllers/admin.controller');

// Get All order
adminRoute.get('/', adminController.getAllOrder);

// Get Product by Pagination
adminRoute.get('/get', adminController.findAllWithPage);

// Retrieve a orderDetail with id
adminRoute.get('/getorder', adminController.getOrderDetailById);

// Get Product by Amount
// adminRoute.get('/getamount', adminController.findAllWithAmount);

// Get Order By Status
// adminRoute.get('/status', adminController.getOrderByStatus)

module.exports = adminRoute;