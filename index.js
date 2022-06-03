const express = require('express');
const allRoutes = require('./routes');
const db = require('./config/connection');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const { User, Project } = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use('/',allRoutes);

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });