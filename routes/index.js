const router = require('express').Router();
const IncorrectPathError = require('../errors/IncorrectPathError');

const routerUsers = require('./users');
const routerCards = require('./cards');

router.use('/users', routerUsers);
router.use('/cards', routerCards);
router.use((req, res, next) => {
  next(new IncorrectPathError());
});

module.exports = router;
