'use strict';

import jwt    from 'jwt-simple';
import moment from 'moment';
import config from '../config';

function createToken (user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };

  return jwt.encode(payload, config.SECRET_TOKEN);
};

function decodeToken (token, callback) {
  try {
    let decoded = {
      code: 200
    };
    decoded.payload = jwt.decode(token, config.SECRET_TOKEN);

    callback(null, decoded);
  } catch (err) {
    if (err.message !== 'Token expired') callback(err);
    else {
      let decoded = {
        code: 401,
        message: 'Token has expired.'
      };
      callback(null, decoded);
    }
  }
};

export default {
  createToken,
  decodeToken
}
