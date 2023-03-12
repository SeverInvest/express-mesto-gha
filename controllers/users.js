const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { STATUS_OK, STATUS_CREATED } = require('../utils/statuses');
const NotFoundError = require('../errors/NotFoundError');
const { nodeEnv, jwtSecret } = require('../config');

function commonSearchUserById(id, res, next) {
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('Resource not found');
    })
    .then((user) => {
      res
        .status(STATUS_OK)
        .send(user);
    })
    .catch(next);
}

module.exports.getUsers = (_, res, next) => {
  User.find()
    .then((users) => {
      res
        .status(STATUS_OK)
        .send({ data: users });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  commonSearchUserById(req.user._id, res, next);
};

module.exports.getUserById = (req, res, next) => {
  commonSearchUserById(req.params.userId, res, next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => res.status(STATUS_CREATED).send(
      {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      },
    ))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Resource not found');
    })
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Resource not found');
    })
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        nodeEnv === 'production' && jwtSecret,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .status(STATUS_OK)
        .send({ token });
    })
    .catch(next);
};
