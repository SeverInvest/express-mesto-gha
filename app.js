const express = require('express');
const mongoose = require('mongoose');
const { port } = require('./config');
const router = require('./routes/index');

const handleError = require('./utils/handleError');

mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63f51333f328ac226f126b20',
  };
  next();
});

app.use(router);

app.use(handleError);

app.listen(port, () => {
  console.log(`App listening on port ${port}`); // eslint-disable-line no-console
});
