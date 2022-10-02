const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const card = require('./routes/cards');
const user = require('./routes/users');
const userAuth = require('./routes/auth');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

// to collect JSON format
app.use(bodyParser.json());
// for receiving web pages inside a POST request
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', userAuth);

app.use(auth);
app.use('/users', user);
app.use('/cards', card);
app.all('/*', (req, res) => {
  res.status(404).send({ message: 'Некорректный URL' });
});

app.listen(PORT);
