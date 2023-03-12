const jwt = require('jsonwebtoken');
const NecessaryAuthorizationError = require('../errors/UnauthorizedError');
const { nodeEnv, jwtSecret } = require('../config');

module.exports = (req, _, next) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      next(new NecessaryAuthorizationError());
    }
    token = authorization.replace('Bearer ', '');
  }

  let payload;

  try {
    payload = jwt.verify(token, nodeEnv === 'production' && jwtSecret);
  } catch (err) {
    next(new NecessaryAuthorizationError());
    return;
  }

  req.user = payload;

  next();
};
