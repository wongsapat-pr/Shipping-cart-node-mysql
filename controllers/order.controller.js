'use strict';
const {
    Cart,
    Order
} = require('../models/order.model');

exports.findByorderId = function (req, res) {
    var name = req.query.name;
    Cart.findByorderId(name, function (err, product) {
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