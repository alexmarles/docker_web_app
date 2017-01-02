'use strict';

// Imports
import express      from 'express';
import ProductCtrl  from '../controllers/products';
import UserCtrl     from '../controllers/users';

// Constants
const api = express.Router();

// Product Resources
api.get('/products', ProductCtrl.index);
api.get('/product/:productId', ProductCtrl.show);
api.post('/product', ProductCtrl.create);
api.put('/product/:productId', ProductCtrl.update);
api.delete('/product/:productId', ProductCtrl.destroy);

// User Resources
api.get('/users', UserCtrl.index);
api.get('/user/:userId', UserCtrl.show);

// Export
export default api;
