// const InternalServerError = require('../errors/InternalServerError');

// const defaultError = (err, req, res) => {
//   const currentError = new InternalServerError(err.messgae);
//   res.send({ error: currentError });
//   console.log({ error: currentError });
// };
function defaultError(err, req, res) {
  console.log(req.status);
  res.status(500);
  res.render('error', { error: err });
}

module.exports = defaultError;
