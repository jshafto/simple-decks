'use strict';

const faker = require('faker');


const { Deck } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    faker.seed(123);

    const getRandDeck = async () => {
      const deck = await Deck.findOne({ order: [[Sequelize.fn('RANDOM')]] });
      return deck.id;
    }

    const getRandFront = () => faker.lorem.sentence();
    const getRandBack = () => faker.lorem.paragraph();

    const r = async (o) => {
      o.deckId = await getRandDeck();
      o.front = getRandFront();
      o.back = getRandBack();
      o.createdAt = new Date();
      o.updatedAt = new Date();
      return o;
    }
    const cardMaker = async () => {
      let arr = [];
      for (let i = 0; i < 150; i++) {
        const next = await r({})
        arr.push(next);
      }
      return arr;
    };
    const cardList = await cardMaker();
    return queryInterface.bulkInsert('Cards', cardList, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cards');
  }
};
