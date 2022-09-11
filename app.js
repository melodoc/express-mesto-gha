const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const card = require('./routes/card');
const user = require('./routes/user');

const { PORT = 3000 } = process.env;
const URI = 'mongodb://localhost:27017/mestodb';

const app = express();

// to collect JSON format
app.use(bodyParser.json());
// for receiving web pages inside a POST request
app.use(bodyParser.urlencoded({ extended: true }));

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
