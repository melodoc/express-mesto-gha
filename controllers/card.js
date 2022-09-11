const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};
