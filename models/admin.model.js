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

Cart.getOrderDetailById = function (id, result) {
    dbConn.query("Select * from clothstore.order_detail where order_id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Order.findAllWithPage = function (lim, off, page, startDate, endDate, status, result) {

    if (isNaN(parseFloat(off))) {
        dbConn.query("Select * from clothstore.order limit " + lim, function (err, res) {
            if (err) {
                console.log("error: ", err)
                result(null, err)
            } else {
                console.log(res);
                result(null, res)
            }
        });
    } else if (lim !== undefined && page !== undefined && startDate === undefined && endDate === undefined && status === undefined) {
        // console.log('hello1')
        dbConn.query('select * from clothstore.order limit ' + lim + " offset " + off, [startDate, endDate, status], function (err, res) {
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
    } else if (startDate !== undefined && endDate !== undefined && status !== undefined) {
        // console.log('hello1')
        dbConn.query('select * from clothstore.order where  end_date between ? AND ? AND order_status = ? limit ' + lim + " offset " + off, [startDate, endDate, status], function (err, res) {
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
    } else if ((startDate === undefined && endDate === undefined) && status !== undefined) {
        // console.log('hello2')
        dbConn.query('select * from clothstore.order where order_status = ? limit ' + lim + " offset " + off, [status], function (err, res) {
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
    } else {
        // console.log('hello3')
        if (startDate === undefined || endDate === undefined) {
            var date;
            if (startDate === undefined) date = endDate;
            if (endDate === undefined) date = startDate;
            console.log(date + status);
            if (status !== undefined) {
                dbConn.query('select * from clothstore.order where order_status = ? AND end_date between ? AND DATE_ADD(?, INTERVAL 1 DAY)  limit ' + lim + " offset " + off, [status, date, date], function (err, res) {
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
            } else {
                dbConn.query('select * from clothstore.order where  end_date between ? AND DATE_ADD(?, INTERVAL 1 DAY)  limit ' + lim + " offset " + off, [date, date], function (err, res) {
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
            }


        } else {
            if (startDate >= endDate) {
                result(null, {
                    'error': 'กรุณาระบุค่าวันที่ใหม่'
                })
            } else {
                if (status !== undefined) {
                    dbConn.query('select * from clothstore.order where order_status = ? AND end_date between ? AND ?  limit ' + lim + " offset " + off, [status, startDate, endDate], function (err, res) {
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
                } else {
                    dbConn.query('select * from clothstore.order where  end_date between ? AND ?  limit ' + lim + " offset " + off, [startDate, endDate], function (err, res) {
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
                }

            }

        }

    }

};

// Order.findAllWithAmount = function (lim, result) {
//     dbConn.query("Select * from clothstore.order limit " + lim, function (err, res) {
//         if (err) {
//             console.log("error: ", err)
//             result(null, err)
//         } else {
//             console.log(res);
//             result(null, res)
//         }
//     });
// };

// Order.getOrderByStatus = function (status, result) {
//     dbConn.query("Select * from clothstore.order where LOWER(CONCAT(order_status)) = ? ", status, function (err, res) {
//         if (err) {
//             console.log("error: ", err)
//             result(null, err)
//         } else {
//             console.log(res);
//             result(null, res)
//         }
//     });
// };


module.exports = {
    Cart,
    Order
};