const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const routerUsers = require('./users');
const routerCards = require('./cards');

router.use('/users', routerUsers);
router.use('/cards', routerCards);
router.use((req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
