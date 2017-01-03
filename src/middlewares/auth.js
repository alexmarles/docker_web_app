'use strict';

import authService  from '../services/auth';

function isAuth (req, res, next) {
  if (!req.headers.authorization) return res.status(403).send({ message: 'Token not provided.' });

  let token = req.headers.authorization.split(' ')[1];
  authService.decodeToken(token, (err, decoded) => {
    if (err) return res.status(500).send({ message: `Error while decoding token: ${err}` });
    if (decoded.code !== 200) return res.status(decoded.code).send({ message: decoded.message });

    req.user = decoded.payload.sub;
    next();
  });
}

export default {
  isAuth
}
