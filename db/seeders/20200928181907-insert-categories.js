'use strict';
function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      r({ label: 'Foreign Languages' }),
      r({ label: 'Mathematics' }),
      r({ label: 'Computer Science' }),
      r({ label: 'Programming Languages' }),
      r({ label: 'Neuroscience' }),
      r({ label: 'Literature' }),
      r({ label: 'Science' }),
      r({ label: 'Cats' }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
