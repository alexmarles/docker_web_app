'use strict';

import express      from 'express';
import auth         from '../middlewares/auth';
import ProductCtrl  from '../controllers/products';
import AuthCtrl     from '../controllers/auth';
import UserCtrl     from '../controllers/users';

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

// User Resources (Protected With Authentication)
api.get('/users', auth.isAuth, UserCtrl.index);
api.get('/user/:userId', auth.isAuth, UserCtrl.show);

export default api;
