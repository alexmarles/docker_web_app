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
  console.log('GET /api/products');
  console.log(req.body);

  Product.find({}, (err, products) => {
    if (err) return res.status(status.error).send({ message: `Error while getting products: ${err}` });
    if (!products) return res.status(status.notFound).send({ message: `Products do not exist` });

    res.status(status.ok).send({ products });
  });
});

// SHOW
app.get('/api/product/:productId', (req, res) => {
  console.log('GET /api/product');
  console.log(req.body);

  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(status.error).send({ message: `Error while getting product: ${err}` });
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
    if (err) return res.status(status.error).send({ message: `Error while saving product in database: ${err}` });

    res.status(status.ok).send({ product: productStored });
  });
});

// UPDATE
app.put('/api/product/:productId', (req, res) => {
  console.log('PUT /api/product');
  console.log(req.body);

  let productId = req.params.productId;

  Product.findByIdAndUpdate(productId, req.body, (err, productUpdated) => {
    if (err) return res.status(status.error).send({ message: `Error while updating product: ${err}` });
    if (!productUpdated) return res.status(status.notFound).send({ message: `Product does not exist` });

    res.status(status.ok).send({ product: productUpdated });
  });
});

// DESTROY
app.delete('/api/product/:productId', (req, res) => {
  console.log('DELETE /api/product');
  console.log(req.body);

  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) return res.status(status.error).send({ message: `Error while deleting product: ${err}` });
    if (!product) return res.status(status.notFound).send({ message: `Product does not exist` });

    product.remove(err => {
      if (err) return res.status(status.error).send({ message: `Error while deleting product: ${err}` });
      
      res.status(status.ok).send({ message: `Product with id=${productId} was deleted` });
    });
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!\n')
});

app.listen(app.get('port'), (err) => {
  console.log(`Server running on http://localhost:${app.get('port')}`);
});
