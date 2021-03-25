'use strict';

const faker = require('faker');

const { User, Category } = require('../models');

const {
  deck1,
  deck2,
  deck3,
  deck4,
  deck5,
  deck6,
  deck7,
  deck8,
  deck9,
  deck10,
  deck11,
  deck12,
  deck13,
} = require("../seed-data");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const getRandUser = async () => {
      const user = await User.findOne({
         order: [[Sequelize.fn('RANDOM')]],
         where: {
           username: {
             [Sequelize.Op.ne]: "Demo"
           }
         }
        });
      return user.id;
    }
    const getRandCategory = async () => {
      const user = await Category.findOne({ order: [[Sequelize.fn('RANDOM')]] });
      return user.id;
    }
    
    const getUser = async (d) => {
      const user = await User.findOne({
        where: {
          username: d.username,
        }
      });
      return user.id;
    };
    
    const getCategory = async (d) => {
      const user = await Category.findOne({
        where: {
          label: d.category,
        }
      });
      return user.id;
    };
    

    const r = async (o) => {
      o.userId = await getRandUser();
      o.categoryId = await getRandCategory();
      const createTimestamp = new Date(faker.date.past());
      o.createdAt = createTimestamp;
      o.updatedAt = createTimestamp;
      return o;
    }
    
    const realDeck = async (d) => {
      const o = { name: d.name, private: false };
      o.userId = await getUser(d);
      o.categoryId = await getCategory(d);
      const createTimestamp = new Date(faker.date.past());
      o.createdAt = createTimestamp;
      o.updatedAt = createTimestamp;
      return o;
    }


    return queryInterface.bulkInsert('Decks', [
      await realDeck(deck1),
      await realDeck(deck2),
      await realDeck(deck3),
      await realDeck(deck4),
      await realDeck(deck5),
      await realDeck(deck6),
      await realDeck(deck7),
      await realDeck(deck8),
      await realDeck(deck9),
      await realDeck(deck10),
      await realDeck(deck11),
      await realDeck(deck12),
      await realDeck(deck13),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
      await r({ name: faker.random.words(), private: false }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Decks');
  }
};
