'use strict';

import mongoose     from 'mongoose';
import bcrypt       from 'bcrypt-nodejs';
import User         from '../models/user';
import authService  from '../services/auth';

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });

  User.findOne({ email: user.email }, (err, userFound) => {
    if (err) return res.status(500).send({ message: `Error while checking for duplicates in database: ${err}` });

    if (userFound) return res.status(409).send({ message: `User with this email is already in database` });
  });

  user.save((err, userStored) => {
    if (err) return res.status(500).send({ message: `Error while saving user in database: ${err}` });

    res.status(200).send({ token: authService.createToken(userStored) });
  });
}

function signIn (req, res) {
  User.findOne({
    email: req.body.email
  }).select('password').exec((err, user) => {
    if (err) return res.status(500).send({ message: `Error while signing user: ${err}` });
    if (!user) return res.status(404).send({ message: 'Authentication failed. User not found.' });

    let match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) return res.status(401).send({ message: 'Authentication failed. Wrong password.' });

    user.lastLoginAt = Date.now();
    user.save((err, userStored) => {
      if (err) return res.status(500).send({ message: `Error while saving user in database: ${err}` });

      res.status(200).send({ token: authService.createToken(userStored) });
    });
  });
}

export default {
  signUp,
  signIn
}
