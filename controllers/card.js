const Card = require('../models/card');

const { ERROR_TYPE, MESSAGE_TYPE, STATUS_CODE } = require('../constants/errors');

// GET /cards — returns all cards
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
      } if (err.name === ERROR_TYPE.validity) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
      }
      return res.status(STATUS_CODE.internalServerError).send({ message: MESSAGE_TYPE.default });
    });
};

// POST /cards — creates a card
module.exports.createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
      } if (err.name === ERROR_TYPE.validity) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
      }
      return res.status(STATUS_CODE.internalServerError).send({ message: MESSAGE_TYPE.default });
    });
};

// DELETE /cards/:cardId — delete a card by cardId
module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(STATUS_CODE.notFound).send({ message: MESSAGE_TYPE.absentedCard });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
      } if (err.name === ERROR_TYPE.validity) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
      }
      return res.status(STATUS_CODE.internalServerError).send({ message: MESSAGE_TYPE.default });
    });
};

// PUT /cards/:cardId/likes — put a line on a card
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // add _id to array if it's not there
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(STATUS_CODE.notFound).send({ message: MESSAGE_TYPE.absentedCard });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
      } if (err.name === ERROR_TYPE.validity) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
      }
      return res.status(STATUS_CODE.internalServerError).send({ message: MESSAGE_TYPE.default });
    });
};

// DELETE /cards/:cardId/likes — delete a like
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // remove _id from the array
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(STATUS_CODE.notFound).send({ message: MESSAGE_TYPE.absentedCard });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
      } if (err.name === ERROR_TYPE.validity) {
        return res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.validity });
      }
      return res.status(STATUS_CODE.internalServerError).send({ message: MESSAGE_TYPE.default });
    });
};
