const Card = require('../models/card');

// GET /cards — returns all cards
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};

// POST /cards — creates a card
module.exports.createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};

// DELETE /cards/:cardId — delete a card by cardId
module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.message}` }));
};
