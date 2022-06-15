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

module.exports = {
    Cart,
    Order
};