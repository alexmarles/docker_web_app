'use strict';

// Imports
import mongoose     from 'mongoose';
import User         from '../models/user';
import authService  from '../services/auth';

// Controller Methods
function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
  });

  user.save((err, userStored) => {
    if (err) return res.status(500).send({ message: `Error while saving user in database: ${err}` });

    res.status(200).send({ token: authService.createToken(userStored) });
  });
}

function signIn (req, res) {
}

// Export
export default {
  signUp,
  signIn
}
