const User = require('../models/user');
const constants = require('../constants/constants');
const errors = require('../constants/errors');
const utilsEntity = require('../utils/errorEntityHelper');
const utilsReject = require('../utils/errorRejectHelper');

const { UPDATE_PARAMS } = constants;
const { ENTITY_TYPE } = errors;
const { errorEntityHandler } = utilsEntity;
const { errorRejectHandler } = utilsReject;

// POST /users — creates a user
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => errorRejectHandler(res, err));
};

// GET /users — returns all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => errorRejectHandler(res, err));
};

// GET /users/:userId - returns user by _id
module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return errorEntityHandler(res, ENTITY_TYPE.user);
      }
      return res.send(user);
    })
    .catch((err) => errorRejectHandler(res, err));
};

// PATCH /users/me — update profile
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, UPDATE_PARAMS)
    .then((user) => {
      if (!user) {
        errorEntityHandler(res, ENTITY_TYPE.user);
        return;
      }
      res.send(user);
    })
    .catch((err) => errorRejectHandler(res, err));
};

// PATCH /users/me/avatar — update avatar
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, UPDATE_PARAMS)
    .then((user) => {
      if (!user) {
        errorEntityHandler(res, ENTITY_TYPE.user);
        return;
      }
      res.send(user);
    })
    .catch((err) => errorRejectHandler(res, err));
};
