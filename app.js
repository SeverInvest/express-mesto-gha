const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { port, addressCors, addressDB } = require('./config');
const router = require('./routes/index');

const handleError = require('./middlewares/handleError');

mongoose.set('strictQuery', false);

const app = express();
app.use(helmet());
app.use(cors({ origin: addressCors }));
app.use(express.json());
mongoose.connect(addressDB);

app.use(cookieParser());

app.use(router);

app.use(handleError);

app.listen(port, () => {
  console.log(`App listening on port ${port}`); // eslint-disable-line no-console
});
