'use strict';

const express = require('express');
const api = express.Router();

const ProductCtrl = require('../controllers/products');

// Product Resources
api.get('/products', ProductCtrl.index);
api.get('/product/:productId', ProductCtrl.show);
api.post('/product', ProductCtrl.create);
api.put('/product/:productId', ProductCtrl.update);
api.delete('/product/:productId', ProductCtrl.destroy);

module.exports = api;
