'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const Product    = require('./models/product');

// DB setup
mongoose.connect('mongodb://mongo:27017');

// App
const app      = express();
const port     = process.env.PORT || 3000;
const status   = {
  ok: 200,
  notFound: 404,
  error: 500
}

app.set('port', port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// INDEX
app.get('/api/products', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.status(status.error).send({ message: `Error during petition: ${err}` });
    if (!products) return res.status(status.notFound).send({ message: `Products do not exist` });

    res.status(status.ok).send({ products });
  });
});

// SHOW
app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(status.error).send({ message: `Error during petition: ${err}` });
    if (!product) return res.status(status.notFound).send({ message: `Product does not exist` });

    res.status(status.ok).send({ product });
  });
});

// CREATE
app.post('/api/product', (req, res) => {
  console.log('POST /api/product');
  console.log(req.body);

  let product         = new Product();
  product.name        = req.body.name;
  product.picture     = req.body.picture;
  product.price       = req.body.price;
  product.category    = req.body.category;
  product.description = req.body.description;

  product.save((err, productStored) => {
    if (err) return res.status(status.error).send({ message: `Error saving product in database: ${err}` });

    res.status(status.ok).send({ message: productStored });
  });
});

// UPDATE
app.put('/api/product/:productId', (req, res) => {
});

// DESTROY
app.delete('/api/product/:productId', (req, res) => {
});

app.get('/', (req, res) => {
  res.send('Hello World!\n')
});

app.listen(app.get('port'), (err) => {
  console.log(`Server running on http://localhost:${app.get('port')}`);
});
