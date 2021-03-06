'use strict';
const Product = require('../models/product.model');

exports.findAll = function (req, res) {
    var limit = req.query.limit;
    var page = req.query.page;
    var offset = (page - 1) * limit;
    var gender = req.query.gender;
    var style = req.query.style;
    var size = req.query.size;
    var search = req.query.search;
    Product.findAll(limit, offset, page, gender, style, size, search, function (err, product) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', product);
        res.send(product);
    });
};

// exports.findAllWithPage = function (req, res) {
//     var limit = req.query.limit;
//     var page = req.query.page;
//     var offset = (page - 1) * limit;
//     var gender = req.query.gender;
//     var style = req.query.style;
//     var size = req.query.size;
//     Product.findAllWithPage(limit, offset, page, gender, style, size, function (err, product) {
//         console.log('controller')
//         if (err)
//             res.send(err);
//         console.log('res', product);
//         res.send(product);
//     });
// };

// exports.findAllWithAmount = function (req, res) {
//     var limit = req.query.amount;
//     Product.findAllWithAmount(limit, function (err, product) {
//         console.log('controller')
//         if (err)
//             res.send(err);
//         console.log('res', product);
//         res.send(product);
//     });
// };

// exports.search = function (req, res) {
//     Product.search(req.query.key, function (err, product) {
//         if (err)
//             res.send(err);
//         res.json(product);
//     });
// };

exports.create = function (req, res) {
    const new_product = new Product(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Product.create(new_product, function (err, product) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "Product added successfully!",
                data: product
            });
        });
    }
};

exports.findById = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Product.update(req.params.id, new Product(req.body), function (err, product) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Product successfully updated'
            });
        });
    }
};

exports.delete = function (req, res) {
    Product.delete(req.params.id, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Product successfully deleted'
        });
    });
};