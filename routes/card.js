const router = require('express').Router();
const { getCards } = require('../controllers/card');

router.get('/', getCards);

module.exports = router;
