const { connect, connection } = require('mongoose');
require('dotenv').config();

connect('mongodb://localhost/stitchdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;