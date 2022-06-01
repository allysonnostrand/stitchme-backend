const { connect, connection } = require('mongoose');

connect('mongodb://localhost/stitchdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;