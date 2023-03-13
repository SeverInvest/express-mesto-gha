const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { nodeEnv, jwtSecret } = require('../config');

module.exports = (req, _, next) => {
  let payload;
  if (req.cookies.jwt) {
    try {
      payload = jwt.verify(req.cookies.jwt, nodeEnv === 'production' && jwtSecret);
    } catch (err) {
      next(new UnauthorizedError('Needed authorization'));
      return;
    }
  } else {
    next(new UnauthorizedError('Needed authorization'));
    return;
  }

  req.user = payload;

  next();
};
