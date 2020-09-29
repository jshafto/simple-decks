const express = require('express');
const asyncHandler = require('express-async-handler');
const { Deck, Category, Card, User, Score } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { authenticated, userInfo } = require('./security-utils');
const score = require('../../db/models/score');



const router = express();
const deckValidators = [
  check('name').notEmpty()
]
const cardValidators = [
  check('front').notEmpty(),
  check('back').notEmpty()
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
router.get('/', userInfo, asyncHandler(async (req, res, next) => {
  let query = (req.query.q) ? req.query.q : '';
  let offset = (req.query.offset) ? req.query.offset : 0;
  let userId = (req.user) ? req.user.id : null;
  const decks = await Deck.findAll({
    limit: 10,
    offset,
    include: [{
      model: Category,
      attributes: ["label"]
    },
    {
      model: Card,
      attributes: ["id"] //would prefer to replace this with a count
    },
    {
      model: Score,
      where: {
        userId
      },
      required: false,
    },
    {
      model: User,
      attributes: ["username"]
    },
  ],
    where: {
      private: {
        [Op.is]: false,
      },
      name: {
        [Op.iLike]: `%${query}%`
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
  const { name, categoryId, private } = req.body;
  const userId = req.user.id;
  const deck = await Deck.create({ name, categoryId, userId, private });
  res.json(deck.id);
}))


// requires auth (user id must match deck's creator)
router.delete('/:deckId(\\d+)', authenticated, asyncHandler(async (req, res, next) => {
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
router.get('/:deckId(\\d+)', userInfo, asyncHandler(async (req, res, next) => {
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
router.put('/:deckId(\\d+)', userInfo, asyncHandler(async (req, res, next) => {
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


// creating a new card in a deck
router.post('/decks/:deckId(\\d+)/cards', authenticated, cardValidators, asyncHandler(async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return next({ status: 422, errors: errors.array() });
  }
  const { front, back } = req.body;
  const card = await Card.create({ front, back, deckId: req.params.deckId });
  res.json({ card });
}))


module.exports = router;
