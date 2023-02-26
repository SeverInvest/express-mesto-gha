const { STATUS_OK } = require('../utils/statuses');
const User = require('../models/user');
const UserNotFoundError = require('../errors/UserNotFoundError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_OK).send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new UserNotFoundError();
    })
    .then((user) => {
      if (!user) {
        throw new UserNotFoundError();
      }
      res.status(STATUS_OK).send({ data: user });
    })
    .catch((error) => {
      console.log(error.name);
      if (error.name === 'UserNotFoundError') {
        res.status(error.status).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
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
