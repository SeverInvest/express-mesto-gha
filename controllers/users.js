const User = require('../models/user');
const { STATUS_OK, STATUS_CREATED } = require('../utils/statuses');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_OK).send({ data: users });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => {
      res.status(STATUS_OK).send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  User.create({ ...req.body })
    .then((user) => res.status(STATUS_CREATED).send({ data: user }))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => {
      res.status(STATUS_OK).send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => {
      res.status(STATUS_OK).send({ data: user });
    })
    .catch(next);
};
