'use strict';
var dbConn = require('../config/db.config');

var Product = function (product) {
    this.product_code = product.product_code;
    this.product_name = product.product_name;
    this.product_gen = product.product_gen;
    this.product_style = product.product_style;
    this.product_style_name = product.product_style_name;
    this.product_size = product.product_size;
    this.product_price = product.product_price;
};

Product.findAll = function (result) {
    dbConn.query("Select * from product", function (err, res) {
        if (err) {
            console.log("error: ", err)
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    });
};

Product.findAllWithPage = function (lim, off, page, result) {
    dbConn.query("Select * from product limit " + lim + " offset " + off, function (err, res) {
        if (err) {
            console.log("error: ", err)
            result(null, err)
        } else {
            console.log(res);
            result(null, {
                'products_page_count': res.length,
                'page_number': page,
                'products': res
            })
        }
    });
};

Product.findAllWithAmount = function (lim, result) {
    dbConn.query("Select * from product limit " + lim, function (err, res) {
        if (err) {
            console.log("error: ", err)
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    });
};

Product.create = function (newProd, result) {
    dbConn.query("INSERT INTO product set ?", newProd, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

Product.findById = function (id, result) {
    dbConn.query("Select * from product where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Product.search = function (key, result) {
    dbConn.query('Select * from product where LOWER(CONCAT(product_gen,product_style,product_style_name,product_size)) LIKE "%' + key + '%" ', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Product.update = function (id, product, result) {
    dbConn.query("UPDATE product SET product_code=?,product_name=?,product_gen=?,product_style=?,product_style_name=?,product_size=?,product_price=? WHERE id = ?", [product.product_code, product.product_name, product.product_gen, product.product_style, product.product_style_name, product.product_size, product.product_price, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Product.delete = function (id, result) {
    dbConn.query("DELETE FROM product WHERE product_code = ?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Product;