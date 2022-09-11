const router = require('express').Router();
const { createUser, getUsers, getUsersById } = require('../controllers/user');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUsersById);

module.exports = router;
