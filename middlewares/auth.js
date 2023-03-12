const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { nodeEnv, jwtSecret } = require('../config');

module.exports = (req, _, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, nodeEnv === 'production' && jwtSecret);
  } catch (err) {
    next(new UnauthorizedError('Needed authorization'));
    return;
  }

  req.user = payload;

  next();
};
