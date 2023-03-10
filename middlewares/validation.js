const { celebrate, Joi } = require('celebrate');

const urlCheckPattern = /https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

const authValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

const registerValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlCheckPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
});

const userValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

const userIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }).unknown(true),
});

const avatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlCheckPattern),
  }).unknown(true),
});

const cardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlCheckPattern),
  }).unknown(true),
});

const cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }).unknown(true),
});

module.exports = {
  authValidate,
  registerValidate,
  userValidate,
  userIdValidate,
  avatarValidate,
  cardValidate,
  cardIdValidate,
};
