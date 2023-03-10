const routerCards = require('express').Router();
const {
  getCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

const {
  cardValidate,
  cardIdValidate,
} = require('../middlewares/validation');

routerCards.get('/', getCard);
routerCards.post('/', cardValidate, createCard);
routerCards.put('/:cardId/likes', cardIdValidate, likeCard);
routerCards.delete('/:cardId', cardIdValidate, deleteCard);
routerCards.delete('/:cardId/likes', cardIdValidate, dislikeCard);

module.exports = routerCards;
