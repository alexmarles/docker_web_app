'use strict';

import User from '../models/user';

function index (req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: `Error while getting users: ${err}` });
    if (!users) return res.status(404).send({ message: `Users not found` });

    res.status(200).send({ users });
  });
}

function show (req, res) {
  let userId = req.params.userId;

  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send({ message: `Error while getting user: ${err}` });
    if (!user) return res.status(404).send({ message: `User not found` });

    res.status(200).send({ user });
  });
}

export default {
  index,
  show
};
