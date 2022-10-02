const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const { ERROR_TYPE, MESSAGE_TYPE, STATUS_CODE } = require('../constants/errors');

// GET /cards — returns all cards
module.exports.getCards = (_req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

// POST /cards — creates a card
module.exports.createCard = (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        res.status(STATUS_CODE.badRequest).send({ message: MESSAGE_TYPE.cast });
        return;
      }
      if (err.name === ERROR_TYPE.validity) {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

// DELETE /cards/:cardId — delete a card by cardId
module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(MESSAGE_TYPE.absentedCard);
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError();
      }
      Card.findByIdAndDelete(req.params.cardId)
        .then((foundCard) => {
          if (!foundCard) {
            throw new ForbiddenError();
          }
          res.send(foundCard);
        })
        .catch((err) => {
          if (err.name === ERROR_TYPE.cast) {
            next(new BadRequestError());
            return;
          }
          next(err);
        });
    })
    .catch(next);
};

// PUT /cards/:cardId/likes — put a line on a card
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // add _id to array if it's not there
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(MESSAGE_TYPE.absentedCard);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

// DELETE /cards/:cardId/likes — delete a like
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    // remove _id from the array
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(MESSAGE_TYPE.absentedCard);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.cast) {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};
