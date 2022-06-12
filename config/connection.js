const { connect, connection, default: mongoose } = require('mongoose');
require('dotenv').config();

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/stitchdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = connection;