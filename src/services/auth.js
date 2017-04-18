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

function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN)

      resolve(payload.sub);
    } catch (err) {
      const status = err.message === 'Token expired' ? 401 : 500
      reject({
        status: status,
        message: err.message
      });
    }
  });

  return decoded;
};

export default {
  createToken,
  decodeToken
}
