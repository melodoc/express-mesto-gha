const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const card = require('./routes/card');
const user = require('./routes/user');

const { PORT = 3000 } = process.env;

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
app.all('/*', (req, res) => {
  res.status(404).send({ message: 'Некорректный URL' });
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT);
