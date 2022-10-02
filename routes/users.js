const router = require('express').Router();
const {
  getUsers, getUsersById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUsersById);
router.get('/me', getCurrentUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
