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

Order.findAll = function (limit, offset, page, startDate, endDate, status, result) {
    var dbQuery = 'Select * from clothstore.order where 1=1';
    if (startDate !== undefined && endDate !== undefined) dbQuery += ' AND end_date BETWEEN ' + "'" + startDate + "' AND " + "'" + endDate + "'";
    if (status !== undefined) dbQuery += ' AND LOWER(order_status) = ' + "'" + status + "'";
    if (limit !== undefined) dbQuery += ' limit ' + limit;
    if (page !== undefined) dbQuery += ' offset ' + offset;
    dbConn.query(dbQuery, function (err, res) {
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

Cart.findByorderId = function (id, result) {
    dbConn.query("select p.product_code,p.product_name,p.product_gen,p.product_style,p.product_style_name,d.order_detail_qty,d.order_detail_price from clothstore.order_detail d  join clothstore.product p on d.product_id = p.id where order_id = ?  ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Cart.addItemtoCart = function (user, detail, result) {
    dbConn.query("select id from clothstore.order where order_fullname = '" + user + "' AND order_status = 'placed_order'", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            // console.log('found Data', Object.keys(res).length);
            if (Object.keys(res).length < 1) {
                console.log("Not found order");
                dbConn.query("INSERT INTO clothstore.order (order_fullname,order_status,start_date) values(?,?,sysdate()) ", [user, 'placed_order'], function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                    } else {
                        console.log(res);
                        dbConn.query("select id from clothstore.order where order_fullname = '" + user + "' AND order_status = 'placed_order'",
                            function (err, res) {
                                if (err) {
                                    console.log("error: ", err);
                                    result(err, null);
                                } else {
                                    var orderId = JSON.stringify(res[0]);
                                    var obj = JSON.parse(orderId);
                                    var orId = obj.id;
                                    // console.log("found order No." + orId);
                                    insertNewItemToCart(orId, detail, result);
                                }
                            });
                    }
                });
            } else {
                // Get order_id from Json
                var orderId = JSON.stringify(res[0]);
                var obj = JSON.parse(orderId);
                var orId = obj.id;
                // console.log("found order No." + orId);
                dbConn.query("select * from clothstore.order_detail where product_id = '" + detail.product_id + "' AND order_id = '" + orId + "'", function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                    } else {
                        console.log(Object.keys(res).length);
                        if (Object.keys(res).length < 1) {
                            // console.log("not found");
                            insertNewItemToCart(orId, detail, result);
                        } else {
                            var prodId = JSON.stringify(res[0]);
                            var obj = JSON.parse(prodId);
                            var id = obj.id;
                            var qty = obj.order_detail_qty;
                            // console.log("found : " + id + qty);
                            updateQtyifItemExist(id, detail, qty, result);
                        }
                    }
                });
            }
        }
    });
}

Order.confirmOrder = function (id, data, result) {
    dbConn.query("UPDATE clothstore.order SET order_address=?,order_status=?,end_date=sysdate() WHERE id = ?", [data.order_address, 'paid', id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

function insertNewItemToCart(orderId, detail, result) {
    dbConn.query("INSERT INTO order_detail (order_id,product_id,order_detail_qty,order_detail_price) values (?,?,?,?)", [orderId, detail.product_id, detail.order_detail_qty, detail.order_detail_price], function (err, res) {
        if (err) {
            console.log("error: ", err);
            // result(err, null);
            result({
                'error': 'ไม่สามารถทำรายการได้เนื่องจากไม่มีสินค้ารหัสนี้'
            }, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

function updateQtyifItemExist(id, detail, data, result) {
    dbConn.query("UPDATE order_detail SET order_detail_qty=? WHERE id = ?", [Number.parseInt(data) + Number.parseInt(detail.order_detail_qty), id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

module.exports = {
    Cart,
    Order
};