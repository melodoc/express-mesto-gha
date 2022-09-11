const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

const URI = 'mongodb://localhost:27017/mestodb';

mongoose.connect(URI, {
}, (err) => {
  if (err) throw err.message;
  console.log(`Connected to ${URI}`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
