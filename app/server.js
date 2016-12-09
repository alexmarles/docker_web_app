'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

// DB setup
mongoose.connect('mongodb://mongo:27017');

// App
const app      = express();
const port     = process.env.PORT || 3000;
const STATUS   = {
  OK: 200,
  NOT_FOUND: 404
}

app.set('port', port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/products', (req, res) => {
  res.status(STATUS.OK).send({ products: [] });
});

app.get('/api/product/:productId', (req, res) => {
});

app.post('/api/product', (req, res) => {
  console.log(req.body);
  res.status(STATUS.OK).send({ message: 'Product received' });
});

app.put('/api/product/:productId', (req, res) => {
});

app.delete('/api/product/:productId', (req, res) => {
});

app.get('/', (req, res) => {
  res.send('Hello World!\n')
});

app.listen(app.get('port'), (err) => {
  console.log(`Server running on http://localhost:${app.get('port')}`);
});
