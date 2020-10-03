const express = require('express');
const asyncHandler = require('express-async-handler');
const { Card, Deck, User } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { authenticated, userInfo } = require('./security-utils');
const router = express();

const cardValidators = [
  check('front').notEmpty(),
  check('back').notEmpty()
]
const errorFormatter = ({ msg, param }) => {
  return `${param}: ${msg}`;
};

const cardNotFoundError = (id) => {
  const err = Error("Card not found");
  err.errors = [`card with id of ${id} could not be found.`];
  err.title = "Card not found.";
  err.status = 404;
  return err;
};

// get a card
router.get('/:cardId(\\d+)', userInfo, asyncHandler(async (req, res, next) => {
  const cardId = req.params.cardId;
  const card = await Card.findByPk(cardId, {
    include: [{
      model: Deck,
      attributes: ['userId', 'private'],
    }],
  });

  if (!card) {
    next(cardNotFoundError(cardId));
  }

  if (card.Deck.private) {
    if (!req.user || req.user.id !== card.deck.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to access this card.";
      err.title = "Unauthorized";
      throw err;
    }
  }
  res.json({ card });
}))

// edit a card
router.put('/:cardId(\\d+)', authenticated, cardValidators, asyncHandler(async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return next({ status: 422, errors: errors.array() });
  }

  const cardId = req.params.cardId;
  const card = await Card.findByPk(cardId, {
    include: [{
      model: Deck,
      attributes: ['userId'],
    }],
  });

  if (!card) {
    next(cardNotFoundError(cardId));
  }


  if (req.user.id !== card.Deck.userId) {
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You are not authorized to access this card.";
    err.title = "Unauthorized";
    throw err;
  }


  const { front, back } = req.body;
  card.front = front;
  card.back = back;
  await card.save();
  res.json({card});
}))

router.delete('/:cardId(\\d+)', authenticated, asyncHandler(async (req, res, next) => {
  const cardId = req.params.cardId;
  const card = await Card.findByPk(cardId, {
    include: [{
      model: Deck,
      attributes: ['userId'],
    }],
  });

  if (!card) {
    next(cardNotFoundError(cardId));
  }


  if (req.user.id !== card.Deck.userId) {
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You are not authorized to delete this card.";
    err.title = "Unauthorized";
    throw err;
  }

  await card.destroy();
  res.json({ message: `Deleted card with id of ${cardId}.` });
}))


module.exports = router;
