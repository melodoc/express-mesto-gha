const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const constants = require('./constants/constants');
const card = require('./routes/card');
const user = require('./routes/user');

const { DEFAULT_PORT } = constants;
const { PORT = DEFAULT_PORT } = process.env;

const app = express();

// to collect JSON format
app.use(bodyParser.json());
// for receiving web pages inside a POST request
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '631dfece3b346f53ef0aea5f',
  };

  next();
});

app.use('/users', user);
app.use('/cards', card);

mongoose.connect('mongodb://localhost:27017/mestodb', {
}, (err) => {
  if (err) throw err.message;
  console.log(`Connected to ${'mongodb://localhost:27017/mestodb'}`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
