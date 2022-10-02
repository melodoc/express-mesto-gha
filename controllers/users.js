const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { UPDATE_PARAMS, EXPIRATION_PERIOD, SECRET_KEY } = require('../constants/constants');
const { ERROR_TYPE, MESSAGE_TYPE, STATUS_CODE } = require('../constants/errors');

// POST /users — creates a user
module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  }).then((user) => res.send(user))
    .catch((err) => {
      if (err.name === ERROR_TYPE.validity) {
        res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
        return;
      }
      res.status(STATUS_CODE.internalError).send({ message: MESSAGE_TYPE.default });
    }));
};

// GET /users — returns all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => res.status(STATUS_CODE.internalError).send({ message: MESSAGE_TYPE.default }));
};

// GET /users/:userId - returns user by _id
module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(STATUS_CODE.notFound).send({ message: MESSAGE_TYPE.absentedUser });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
        return;
      }
      res.status(STATUS_CODE.internalError).send({ message: MESSAGE_TYPE.default });
    });
};

// PATCH /users/me — update profile
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, UPDATE_PARAMS)
    .then((user) => {
      if (!user) {
        res.status(STATUS_CODE.notFound).send({ message: MESSAGE_TYPE.absentedUser });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
        return;
      } if (err.name === ERROR_TYPE.validity) {
        res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
        return;
      }
      res.status(STATUS_CODE.internalError).send({ message: MESSAGE_TYPE.default });
    });
};

// PATCH /users/me/avatar — update avatar
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, UPDATE_PARAMS)
    .then((user) => {
      if (!user) {
        res.status(STATUS_CODE.notFound).send({ message: MESSAGE_TYPE.absentedUser });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
        return;
      } if (err.name === ERROR_TYPE.validity) {
        res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
        return;
      }
      res.status(STATUS_CODE.internalError).send({ message: MESSAGE_TYPE.default });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch((err) => {
      res
        .status(STATUS_CODE.unauthorized)
        .send({ message: err.message });
    });
};

// GET /users/me — get profile info
module.exports.getCurrentUser = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res
        .status(STATUS_CODE.unauthorized)
        .send({ message: err.message });
    });
};
