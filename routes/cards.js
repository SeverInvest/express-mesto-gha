const routerCards = require('express').Router();
const {
  getCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

routerCards.get('/', getCard);
routerCards.post('/', createCard);
routerCards.put('/:cardId/likes', likeCard);
routerCards.delete('/:cardId', deleteCard);
routerCards.delete('/:cardId/likes', dislikeCard);

module.exports = routerCards;
