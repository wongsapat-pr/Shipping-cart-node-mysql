'use strict';
var dbConn = require('../config/db.config');

var Order = function (order) {
    this.order_fullname = order.order_fullname;
    this.order_address = order.order_address;
    this.order_status = order.order_status;
    this.start_date = order.start_date;
    this.end_date = order.end_date;
};

var Cart = function (cart) {
    this.order_id = cart.order_id;
    this.product_id = cart.product_id;
    this.order_detail_qty = cart.order_detail_qty;
    this.order_detail_price = cart.order_detail_price;
};

Order.getAllOrder = function (result) {
    dbConn.query("Select * from clothstore.order", function (err, res) {
        if (err) {
            console.log("error: ", err)
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    });
};

Cart.getOrderbyId = function (user, result) {
    dbConn.query("Select * from order_detail where (select order_id from clothstore.order where order_fullname = '" + user + "' AND order_status = 'placed_order') ", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Order.findAllWithPage = function (lim, off, page, result) {
    dbConn.query("Select * from clothstore.order limit " + lim + " offset " + off, function (err, res) {
        if (err) {
            console.log("error: ", err)
            result(null, err)
        } else {
            console.log(res);
            result(null, {
                'products_page_count': res.length,
                'page_number': page,
                'order': res
            })
        }
    });
};

Order.findAllWithAmount = function (lim, result) {
    dbConn.query("Select * from clothstore.order limit " + lim, function (err, res) {
        if (err) {
            console.log("error: ", err)
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    });
};

Order.getOrderByStatus = function (status, result) {
    dbConn.query("Select * from clothstore.order where LOWER(CONCAT(order_status)) = ? ", status, function (err, res) {
        if (err) {
            console.log("error: ", err)
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    });
};


module.exports = {
    Cart,
    Order
};