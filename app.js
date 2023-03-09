const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { port } = require('./config');
const router = require('./routes/index');

const handleError = require('./middlewares/handleError');

mongoose.set('strictQuery', false);

const app = express();
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(cookieParser());

app.use(router);

app.use(handleError);

app.listen(port, () => {
  console.log(`App listening on port ${port}`); // eslint-disable-line no-console
});
