const dotenv = require('dotenv'); // eslint-disable-line

dotenv.config();
module.exports = {
  port: process.env.PORT || 3000,
};
