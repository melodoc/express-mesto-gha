const User = require('../models/user');

const { UPDATE_PARAMS } = require('../constants/constants');
const { ERROR_TYPE, MESSAGE_TYPE, STATUS_CODE } = require('../constants/errors');

// POST /users — creates a user
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
      } if (err.name === ERROR_TYPE.validity) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
      }
      return res.status(STATUS_CODE.internalServerError).send({ message: MESSAGE_TYPE.default });
    });
};

// GET /users — returns all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
      } if (err.name === ERROR_TYPE.validity) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
      }
      return res.status(STATUS_CODE.internalServerError).send({ message: MESSAGE_TYPE.default });
    });
};

// GET /users/:userId - returns user by _id
module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(STATUS_CODE.notFound).send({ message: MESSAGE_TYPE.absentedUser });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
      } if (err.name === ERROR_TYPE.validity) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
      }
      return res.status(STATUS_CODE.internalServerError).send({ message: MESSAGE_TYPE.default });
    });
};

// PATCH /users/me — update profile
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, UPDATE_PARAMS)
    .then((user) => {
      if (!user) {
        return res.status(STATUS_CODE.notFound).send({ message: MESSAGE_TYPE.absentedUser });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
      } if (err.name === ERROR_TYPE.validity) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
      }
      return res.status(STATUS_CODE.internalServerError).send({ message: MESSAGE_TYPE.default });
    });
};

// PATCH /users/me/avatar — update avatar
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, UPDATE_PARAMS)
    .then((user) => {
      if (!user) {
        return res.status(STATUS_CODE.notFound).send({ message: MESSAGE_TYPE.absentedUser });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
      } if (err.name === ERROR_TYPE.validity) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
      }
      return res.status(STATUS_CODE.internalServerError).send({ message: MESSAGE_TYPE.default });
    });
};
