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
const STATUS   = {
  OK: 200,
  NOT_FOUND: 404,
  ERROR: 500
}

app.set('port', port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// INDEX
app.get('/api/products', (req, res) => {
  res.status(STATUS.OK).send({ products: [] });
});

// SHOW
app.get('/api/product/:productId', (req, res) => {
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
    if (err) res.status(STATUS.ERROR).send({ message: `Error saving product in database: ${err}` });

    res.status(STATUS.OK).send({ message: productStored });
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
