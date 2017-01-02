'use strict';

// Imports
import authService from '../services/auth';

// Middleware method
function authenticate (req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) return res.status(403).send({ message: 'Token not provided' });

  authService.decodeToken(token, (err, decoded) => {
    if (err) return res.status(500).send({ message: `Error while decoding token: ${err}` });

    req.decoded = decoded;
    next();
  });
}

// Export
export default {
  authenticate
}
