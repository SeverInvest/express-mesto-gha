const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');

const UserNotFoundError = require('../errors/UserNotFoundError');
const ValidationError = require('../errors/ValidationError');
const InternalServerError = require('../errors/InternalServerError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
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
      if (!user) {
        throw new UserNotFoundError();
      }
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => res.status(201).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new UserNotFoundError();
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      } else if (error.name === 'UserNotFoundError') {
        res.status(error.status).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new UserNotFoundError();
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      } else if (error.name === 'UserNotFoundError') {
        res.status(error.status).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};
