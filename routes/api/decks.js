const express = require('express');
const asyncHandler = require('express-async-handler');
const { Deck, Category } = require('../../db/models');
const { check, validationResult } = require('express-validator');


const router = express();
const deckValidators = [
  check('name').notEmpty()
]
const errorFormatter = ({ msg, param }) => {
  return `${param}: ${msg}`;
};

router.get('/', asyncHandler(async (req, res, next) => {
  const decks = await Deck.findAll({
    limit: 20,
    include: {
      model: Category
    },
    where: {
      private: {
        [Op.is]: false,
      }
    }})
    res.json(decks);
}))

router.post('/', deckValidators, asyncHandler(async (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return next({ status: 422, errors: errors.array() });
  }
  const {name, categoryId, userId, private} = req.body;
  const deck = await Deck.create({name, categoryId, userId, private});
  res.json(deck.id);
}))


module.exports = router;
