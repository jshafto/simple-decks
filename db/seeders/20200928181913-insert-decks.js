'use strict';

const { User, Category } = require('../models');




module.exports = {
  up: async (queryInterface, Sequelize) => {
    const getRandUser = async () => {
      const user = await User.findOne({ order: [[Sequelize.fn('RANDOM')]] });
      return user.id;
    }
    const getRandCategory = async () => {
      const user = await Category.findOne({ order: [[Sequelize.fn('RANDOM')]] });
      return user.id;
    }

    const r = async (o) => {
      o.userId = await getRandUser();
      o.categoryId = await getRandCategory();
      o.createdAt = new Date();
      o.updatedAt = new Date();
      return o;
    }

    return queryInterface.bulkInsert('Decks', [
      await r({ name: 'Test01', private: true }),
      await r({ name: 'Test02', private: true }),
      await r({ name: 'Test03', private: true }),
      await r({ name: 'Test04', private: true }),
      await r({ name: 'Test05', private: true }),
      await r({ name: 'Test06', private: true }),
      await r({ name: 'Test07', private: true }),
      await r({ name: 'Test08', private: true }),
      await r({ name: 'Test09', private: true }),
      await r({ name: 'Test10', private: true }),
      await r({ name: 'Test11', private: false }),
      await r({ name: 'Test12', private: false }),
      await r({ name: 'Test13', private: false }),
      await r({ name: 'Test14', private: false }),
      await r({ name: 'Test15', private: false }),
      await r({ name: 'Test16', private: false }),
      await r({ name: 'Test17', private: false }),
      await r({ name: 'Test18', private: false }),
      await r({ name: 'Test19', private: false }),
      await r({ name: 'Test20', private: false }),
      await r({ name: 'Test21', private: false }),
      await r({ name: 'Test22', private: false }),
      await r({ name: 'Test23', private: false }),
      await r({ name: 'Test24', private: false }),
      await r({ name: 'Test25', private: false }),
      await r({ name: 'Test26', private: false }),
      await r({ name: 'Test27', private: false }),
      await r({ name: 'Test28', private: false }),
      await r({ name: 'Test29', private: false }),
      await r({ name: 'Test30', private: false }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Decks');
  }
};
