const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../constants/constants');
const { STATUS_CODE } = require('../constants/errors');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(STATUS_CODE.unauthorized)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res
      .status(STATUS_CODE.unauthorized)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
