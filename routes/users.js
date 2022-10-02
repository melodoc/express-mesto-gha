const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUsers, getUsersById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { URL_REG_EXP } = require('../constants/constants');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
  headers: Joi.object().keys({
  }).unknown(true),
}), updateProfile);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).required(),
  }),
  headers: Joi.object().keys({
  }).unknown(true),
}), getUsersById);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().regex(URL_REG_EXP).required(),
  }),
  headers: Joi.object().keys({
  }).unknown(true),
}), updateAvatar);

module.exports = router;
