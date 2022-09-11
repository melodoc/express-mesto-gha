const Card = require('../models/card');
const errors = require('../constants/errors');

const { errorHandler } = errors;

// GET /cards — returns all cards
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => errorHandler(res, err));
};

// POST /cards — creates a card
module.exports.createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => errorHandler(res, err));
};

// DELETE /cards/:cardId — delete a card by cardId
module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => errorHandler(res, err));
};

// PUT /cards/:cardId/likes — put a line on a card
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // add _id to array if it's not there
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => errorHandler(res, err));
};

// DELETE /cards/:cardId/likes — delete a like
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // remove _id from the array
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => errorHandler(res, err));
};
