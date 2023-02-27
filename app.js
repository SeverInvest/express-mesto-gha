const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const handleError = require('./utils/handleError');

mongoose.set('strictQuery', false);

const { PORT = 3000 } = process.env;

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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
