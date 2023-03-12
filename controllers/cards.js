const Cards = require('../models/card');
const { STATUS_OK, STATUS_CREATED } = require('../utils/statuses');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCard = (req, res, next) => {
  Cards.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(STATUS_OK).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => {
      res.status(STATUS_CREATED).send({ data: card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Resource not found');
    })
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(STATUS_OK).send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Resource not found');
    })
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(STATUS_OK).send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Resource not found');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Cards.deleteOne(card)
          .then(() => res.status(STATUS_OK).send({ data: card, message: 'Карточка удалена' }))
          .catch(next);
      } else {
        throw new ForbiddenError('Access to execution is forbidden');
      }
    })
    .catch(next);
};
