const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const bodyParser = require('body-parser');
const router = require('./routes/index');

const handleError = require('./utils/handleError');

mongoose.set('strictQuery', false);

const { PORT = 3000 } = process.env;

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
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
