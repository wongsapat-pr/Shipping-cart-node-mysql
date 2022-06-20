'use strict';
const {
    Cart,
    Order
} = require('../models/order.model');

exports.findAll = function (req, res) {
    var limit = req.query.limit;
    var page = req.query.page;
    var offset = (page - 1) * limit;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    var status = req.query.status;
    Order.findAll(limit, offset, page, startDate, endDate, status, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

exports.findByorderId = function (req, res) {
    Cart.findByorderId(req.params.id, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

exports.addItemtoCart = function (req, res) {
    var name = req.query.name;
    const new_detail = new Cart(req.body);
    Cart.addItemtoCart(name, new_detail, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

exports.confirmOrder = function (req, res) {
    var id = req.query.id;
    const address = new Order(req.body);
    Order.confirmOrder(id, address, function (err, address) {
        if (err)
            res.send(err);
        res.json(address);
    });
}