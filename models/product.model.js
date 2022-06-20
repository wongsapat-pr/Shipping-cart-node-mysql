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

Product.findAll = function (limit, offset, page, gender, style, size, search, result) {
    var dbQuery = 'Select * from product where 1=1';
    if (gender !== undefined) dbQuery += ' AND LOWER(product_gen) = ' + "'" + gender + "'";
    if (style !== undefined) dbQuery += ' AND LOWER(product_style) = ' + "'" + style + "'";
    if (size !== undefined) dbQuery += ' AND LOWER(product_size) = ' + "'" + size + "'";
    if (search !== undefined) dbQuery += ' AND LOWER(CONCAT(product_gen,product_style,product_style_name,product_size)) LIKE "%' + search + '%" ';
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

Product.findAllWithPage = function (lim, off, gender, style, size, result) {
    if (isNaN(parseFloat(off))) {
        dbConn.query("Select * from product limit " + lim, function (err, res) {
            if (err) {
                console.log("error: ", err)
                result(null, err)
            } else {
                console.log(res);
                result(null, res)
            }
        });
    } else if (gender === undefined && style === undefined && size === undefined) {
        // console.log('gss is null')
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
    } else if (gender !== undefined && style !== undefined && size === undefined) {
        console.log('Hello1')
        dbConn.query("Select * from product where LOWER(product_gen) = ? AND LOWER(product_style) = ? limit " + lim + " offset " + off, [gender, style], function (err, res) {
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
    } else if (gender !== undefined && style === undefined && size !== undefined) {
        console.log('Hello2')
        dbConn.query("Select * from product where LOWER(product_gen) = ? AND LOWER(product_size) = ? limit " + lim + " offset " + off, [gender, size], function (err, res) {
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
    } else if (gender === undefined && style !== undefined && size !== undefined) {
        console.log('Hello4')
        dbConn.query("Select * from product where LOWER(product_style) = ? AND LOWER(product_size) = ? limit " + lim + " offset " + off, [style, size], function (err, res) {
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
    } else if (gender !== undefined && style !== undefined && size !== undefined) {
        console.log('Hello3')
        dbConn.query("Select * from product where LOWER(product_gen) = ? AND LOWER(product_style) = ? AND LOWER(product_size) = ? limit " + lim + " offset " + off, [gender, style, size], function (err, res) {
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
    } else {
        // console.log('not null' + gender + style + size)
        dbConn.query("Select * from product where LOWER(product_gen) = ? OR LOWER(product_style) = ? OR LOWER(product_size) = ? limit " + lim + " offset " + off, [gender, style, size], function (err, res) {
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
    }

};

// Product.findAllWithAmount = function (lim, result) {
//     dbConn.query("Select * from product limit " + lim, function (err, res) {
//         if (err) {
//             console.log("error: ", err)
//             result(null, err)
//         } else {
//             console.log(res);
//             result(null, res)
//         }
//     });
// };

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

Product.create = function (newProd, result) {
    dbConn.query("INSERT INTO product set ?", newProd, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result({
                'error': 'ไม่สามารถทำรายการได้ เนื่องจากรหัสสินค้าซ้ำ'
            }, null);
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