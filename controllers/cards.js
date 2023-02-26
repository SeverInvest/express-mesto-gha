// const ErrorNotFound = require('../errors/ErrorNotFound');
// const BadRequestError = require('../errors/BadRequestError');
const Cards = require('../models/card');
const CardNotFoundError = require('../errors/CardNotFoundError');
// const UserNotFoundError = require('../errors/UserNotFoundError');

module.exports.getCard = (req, res) => {
  Cards.find({})
    .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(500).send({ message: 'Internal Server Error' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => {
      res
        .status(201)
        .send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new CardNotFoundError();
    })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new CardNotFoundError();
      }
      res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CardNotFoundError') {
        res.status(error.status).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new CardNotFoundError();
    })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new CardNotFoundError();
      }
      res.status(200).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CardNotFoundError') {
        res.status(error.status).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new CardNotFoundError();
    })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new CardNotFoundError();
      }
      res.status(200).send({ data: card, message: 'Карточка удалена' });
    })
    .catch((error) => {
      if (error.name === 'CardNotFoundError') {
        res.status(error.status).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};
