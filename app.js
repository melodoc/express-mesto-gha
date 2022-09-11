const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const constants = require('./constants/constants');
const card = require('./routes/card');
const user = require('./routes/user');

const { DEFAULT_PORT, URI, USER_ID } = constants;
const { PORT = DEFAULT_PORT } = process.env;

const app = express();

// to collect JSON format
app.use(bodyParser.json());
// for receiving web pages inside a POST request
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: USER_ID,
  };

  next();
});

app.use('/users', user);
app.use('/cards', card);

mongoose.connect(URI, {
}, (err) => {
  if (err) throw err.message;
  console.log(`Connected to ${URI}`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
