// const InternalServerError = require('../errors/InternalServerError');

// const defaultError = (err, req, res) => {
//   const currentError = new InternalServerError(err.messgae);
//   res.send({ error: currentError });
//   console.log({ error: currentError });
// };
function handleError(error, req, res, next) {
  res.status(error.status);
  res.send({ message: error.message });
  next();
}

module.exports = handleError;
