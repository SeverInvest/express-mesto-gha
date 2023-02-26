const router = require('express').Router();

const routerUsers = require('./users');
const routerCards = require('./cards');

router.use('/users', routerUsers);
router.use('/cards', routerCards);
router.get('/', (req, res) => {
  console.log(req.params);
  res.status(200).send({ data: 'Ok' });
});

module.exports = router;
