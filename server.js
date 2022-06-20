const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 3000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Require product routes
const productRoutes = require('./routes/product.route');
const orderRoutes = require('./routes/order.route');

// using as middleware
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});