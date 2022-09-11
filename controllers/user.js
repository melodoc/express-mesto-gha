const User = require('../models/user');

// POST /users — создаёт пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};

// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user));
};

// GET /users/:userId - возвращает пользователя по _id
module.exports.getUsersById = (req, res) => {
  const { _id } = req.body;

  User.find({ _id })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};
