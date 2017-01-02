'use strict';

import express      from 'express';
import authRoutes   from '../middlewares/auth_routes';
import ProductCtrl  from '../controllers/products';
import UserCtrl     from '../controllers/users';
import AuthCtrl     from '../controllers/auth';

const api = express.Router();

// Product Resources
api.get('/products', ProductCtrl.index);
api.get('/product/:productId', ProductCtrl.show);
api.post('/product', ProductCtrl.create);
api.put('/product/:productId', ProductCtrl.update);
api.delete('/product/:productId', ProductCtrl.destroy);

// Auth Resources
api.post('/sign_up', AuthCtrl.signUp);
api.post('/sign_in', AuthCtrl.signIn);

api.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome!' });
});

// Protected Routes with Authentication
api.use(authRoutes.authenticate);

// User Resources
api.get('/users', UserCtrl.index);
api.get('/user/:userId', UserCtrl.show);

export default api;
