'use strict';

const faker = require('faker');


const { Deck } = require('../models');

const { deckNames, realCards } = require("../seed-data");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    faker.seed(123);

    const getRandDeck = async () => {
      const deck = await Deck.findOne({
        order: [[Sequelize.fn('RANDOM')]],
        where: {
          name: {
            [Sequelize.Op.notIn]: deckNames,
          }
        }
      });
      return deck.id;
    }
    const getDeck = async (c) => {
      const deck = await Deck.findOne({
        where: {
          name: c.deckName
        }
      });
      return deck.id;
    }

    const getRandFront = () => faker.random.words(8);
    const getRandBack = () => faker.random.words(25);

    const r = async (o) => {
      o.deckId = await getRandDeck();
      o.front = getRandFront();
      o.back = getRandBack();
      o.createdAt = new Date();
      o.updatedAt = new Date();
      return o;
    }
    
    const realCard = async (card) => {
      const newCard = {};
      newCard.deckId = await getDeck(card);
      newCard.front = card.front;
      newCard.back = card.back;
      newCard.createdAt = new Date();
      newCard.updatedAt = new Date();
      return newCard;
    }
    const cardMaker = async () => {
      let arr = [];
      for (let i = 0; i < 1000; i++) {
        const next = await r({})
        arr.push(next);
      }
      // await realCards.forEach(async (c, ind) => {
      //   const next = await realCard(c);
      //   arr.push(next);
      // })
      
      for (let el of realCards) {
        const next = await realCard(el);
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
