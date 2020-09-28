const express = require('express');
const asyncHandler = require('express-async-handler');
const { Deck, Category} = require('../../db/models');
const { Op } = require('sequelize');
const router = express();


router.get('/', asyncHandler(async (req, res, next) => {
  const categories = await Category.findAll();
  res.json(categories)
}));

router.get('/:categoryId/decks', asyncHandler(async (req, res, next) => {
  const decks = await Deck.findAll({
    where: {
      categoryId: req.params.categoryId,
      private: {
        [Op.is]: false,
      }
    },
    limit: 20,
  });
  res.json(decks);
}))

module.exports = router;
