'use strict';

import mongoose     from 'mongoose';
import User         from '../models/user';
import authService  from '../services/auth';

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });

  user.save((err, userStored) => {
    if (err) return res.status(500).send({ message: `Error while saving user in database: ${err}` });

    res.status(200).send({ token: authService.createToken(userStored) });
  });
}

function signIn (req, res) {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error while signing user: ${err}` });
    if (!user) return res.status(404).send({ message: 'Authentication failed. User not found.' });
    if (user.password != req.body.password) return res.status(401).send({ message: 'Authentication failed. Wrong password.' });

    res.status(200).send({ token: authService.createToken(user) });
  });
}

export default {
  signUp,
  signIn
}
