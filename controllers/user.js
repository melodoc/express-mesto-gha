const User = require('../models/user');

// POST /users — creates a user
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};

// GET /users — returns all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user));
};

// GET /users/:userId - returns user by _id
module.exports.getUsersById = (req, res) => {
  const { _id } = req.body;

  User.find({ _id })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};
