const router = require('express').Router();
const {
  createUser, getUsers, getUsersById, updateProfile, updateAvatar, login,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/signup', createUser);
router.post('/signin', login);
router.get('/:userId', getUsersById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
