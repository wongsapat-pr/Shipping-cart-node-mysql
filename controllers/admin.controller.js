'use strict';
const {
    Cart,
    Order
} = require('../models/admin.model');

exports.getAllOrder = function (req, res) {
    Order.getAllOrder(function (err, order) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', order);
        res.send(order);
    });
};

exports.getOrderbyId = function (req, res) {
    var name = req.query.name;
    Cart.getOrderbyId(name, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

exports.findAllWithPage = function (req, res) {
    var limit = 5;
    var page = req.query.page;
    var offset = (page - 1) * limit;
    Order.findAllWithPage(limit, offset, page, function (err, product) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', product);
        res.send(product);
    });
};

exports.findAllWithAmount = function (req, res) {
    var limit = req.query.amount;
    Order.findAllWithAmount(limit, function (err, product) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', product);
        res.send(product);
    });
};

exports.getOrderByStatus = function (req, res) {
    var status = req.query.status;
    console.log(status);
    Order.getOrderByStatus(status, function (err, order) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', order);
        res.send(order);
    });
};