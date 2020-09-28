const express = require('express');
const asyncHandler = require('express-async-handler');
const { Deck, Category, Card } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { authenticated, userInfo } = require('./security-utils');



const router = express();
const deckValidators = [
  check('name').notEmpty()
]
const errorFormatter = ({ msg, param }) => {
  return `${param}: ${msg}`;
};

const deckNotFoundError = (id) => {
  const err = Error("Deck not found");
  err.errors = [`Deck with id of ${id} could not be found.`];
  err.title = "Deck not found.";
  err.status = 404;
  return err;
};

// does not require auth
router.get('/', asyncHandler(async (req, res, next) => {
  const decks = await Deck.findAll({
    limit: 20,
    include: [{
      model: Category
    },
    {
      model: Card,
      attributes: ["id"],
    }],
    where: {
      private: {
        [Op.is]: false,
      }
    },
  })
  res.json(decks);
}))

// requires auth
router.post('/', authenticated, deckValidators, asyncHandler(async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return next({ status: 422, errors: errors.array() });
  }
  const { name, categoryId, userId, private } = req.body;
  const deck = await Deck.create({ name, categoryId, userId, private });
  res.json(deck.id);
}))


// requires auth (user id must match deck's creator)
router.delete('/:deckId', authenticated, asyncHandler(async (req, res, next) => {
  const deckId = req.params.id;
  const deck = await Deck.findByPk(deckId);
  if (req.user.id !== deck.userId) {
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You are not authorized to delete this deck.";
    err.title = "Unauthorized";
    throw err;
  }
  if (deck) {
    await deck.destroy();
    res.json({ message: `Deleted deck with id of ${deckId}.` });
  } else {
    next(deckNotFoundError(deckId));
  }
}))


// requires auth on private decks
router.get('/:deckId', userInfo, asyncHandler(async (req, res, next) => {
  const deckId = req.params.deckId;
  const deck = await Deck.findByPk(deckId, {
    include: [{
      model: Category
    },
    {
      model: Card,
    }],
  });

  if (!deck) {
    next(deckNotFoundError(deckId));
  }

  if (deck.private) {
    if (!req.user || req.user.id !== deck.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to access this deck.";
      err.title = "Unauthorized";
      throw err;
    }
  }
  res.json({ deck });
}))

// for editing deck info - have not tested
router.put('/:deckId', userInfo, asyncHandler(async (req, res, next) => {
  const deckId = req.params.deckId;
  const { name, categoryId, private } = req.body;
  const deck = await Deck.findByPk(deckId);

  if (req.user.id !== deck.userId) {
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You are not authorized to delete this deck.";
    err.title = "Unauthorized";
    throw err;
  }
  if (deck) {
    deck.name = name;
    deck.categoryId = categoryId;
    deck.private = private;

    await deck.save();
    res.json({ deck });
  } else {
    next(deckNotFoundError(deckId));
  }
}))

module.exports = router;
