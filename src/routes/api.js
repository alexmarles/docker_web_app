'use strict';

import express      from 'express';
import auth         from '../middlewares/auth';
import ProductCtrl  from '../controllers/products';
import AuthCtrl     from '../controllers/auth';
import UserCtrl     from '../controllers/users';

const api = express.Router();

// Product Resources
api.get('/products', ProductCtrl.index);
api.get('/products/:productId', ProductCtrl.show);
api.post('/products', ProductCtrl.create);
api.put('/products/:productId', ProductCtrl.update);
api.delete('/products/:productId', ProductCtrl.destroy);

// Auth Resources
api.post('/sign_up', AuthCtrl.signUp);
api.post('/sign_in', AuthCtrl.signIn);

// User Resources (Protected With Authentication)
api.get('/users', auth.isAuth, UserCtrl.index);
api.get('/users/:userId', auth.isAuth, UserCtrl.show);

// General Routes
api.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome!' });
});

export default api;
