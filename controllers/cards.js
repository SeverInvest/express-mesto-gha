// const mongoose = require('mongoose');

const Cards = require('../models/card');
const { STATUS_OK, STATUS_CREATED } = require('../utils/statuses');
const NotFoundError = require('../errors/NotFoundError');
// const ValidationError = require('../errors/ValidationError');
// const InternalServerError = require('../errors/InternalServerError');

module.exports.getCard = (req, res, next) => {
  Cards.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(STATUS_OK).send(cards))
    .catch(next);
  // .catch(() => {
  //   next(new InternalServerError());
  // });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => {
      res.status(STATUS_CREATED).send({ data: card });
    })
    .catch(next);
  // .catch((error) => {
  //   if (error instanceof mongoose.Error.ValidationError) {
  //     next(new ValidationError());
  //   } else {
  //     next(new InternalServerError());
  //   }
  // });
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .populate('owner')
    .then((card) => {
      res.status(STATUS_OK).send({ data: card });
    })
    .catch(next);
  // .catch((error) => {
  //   if (error instanceof NotFoundError) {
  //     next(error);
  //   } else if (error instanceof mongoose.Error.CastError) {
  //     next(new ValidationError());
  //   } else {
  //     next(new InternalServerError());
  //   }
  // });
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFoundError();
    })
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(STATUS_OK).send({ data: card });
    })
    .catch(next);
  // .catch((error) => {
  //   if (error instanceof NotFoundError) {
  //     next(error);
  //   } else if (error instanceof mongoose.Error.CastError) {
  //     next(new ValidationError());
  //   } else {
  //     next(new InternalServerError());
  //   }
  // });
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(STATUS_OK).send({ data: card, message: 'Карточка удалена' });
    })
    .catch(next);
  // .catch((error) => {
  //   if (error instanceof NotFoundError) {
  //     next(error);
  //   } else if (error instanceof mongoose.Error.CastError) {
  //     next(new ValidationError());
  //   } else {
  //     next(new InternalServerError());
  //   }
  // });
};
