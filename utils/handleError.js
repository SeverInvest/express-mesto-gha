function handleError(error, req, res, next) {
  res.status(error.status);
  res.send({ message: error.message });
  next();
}

module.exports = handleError;
