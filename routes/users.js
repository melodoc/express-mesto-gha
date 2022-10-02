const router = require('express').Router();
const {
  createUser, getUsers, getUsersById, updateProfile, updateAvatar, login, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/signup', createUser);
router.post('/signin', login);
router.get('/:userId', getUsersById);
router.patch('/me', updateProfile);
router.get('/me', getCurrentUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
