const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');
const { STATUS_OK, STATUS_CREATED } = require('../utils/statuses');
const UserNotFoundError = require('../errors/UserNotFoundError');
const ValidationError = require('../errors/ValidationError');
const InternalServerError = require('../errors/InternalServerError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_OK).send({ data: users });
    })
    .catch(() => {
      next(new InternalServerError());
    });
};

module.exports.getUserById = (req, res, next) => {
  if (!ObjectId.isValid(req.params.userId)) {
  // if (!(Number(`0x${req.params.userId}` && [...req.params.userId].length === 24))) {
  // жалко удалять строчку выше... Так красиво получилось))), но наставник подсказала лучший путь)))
    next(new ValidationError());
    return;
  }
  User.findById(req.params.userId)
    .orFail(() => {
      throw new UserNotFoundError();
    })
    .then((user) => {
      res.status(STATUS_OK).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError());
      } else if (error instanceof UserNotFoundError) {
        next(error);
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports.createUser = (req, res, next) => {
  User.create({ ...req.body })
    .then((user) => res.status(STATUS_CREATED).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError());
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new UserNotFoundError();
    })
    .then((user) => {
      res.status(STATUS_OK).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError());
      } else if (error instanceof UserNotFoundError) {
        next(error);
      } else {
        next(new InternalServerError());
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new UserNotFoundError();
    })
    .then((user) => {
      res.status(STATUS_OK).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationError());
      } else if (error instanceof UserNotFoundError) {
        next(error);
      } else {
        next(new InternalServerError());
      }
    });
};
