'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('somethingmoresecurethanpassword');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ username: 'Demo', email: 'demoaccount@example.com', hashedPassword: createPassword() }),
      r({ username: 'brisktangible', email: 'bellbottom@example.com', hashedPassword: createPassword() }),
      r({ username: 'Julie', email: 'soandso@example.com', hashedPassword: createPassword() }),
      r({ username: 'raggedcringle', email: 'raggedcringle@example.com', hashedPassword: createPassword() }),
      r({ username: 'heartaccidental', email: 'heartaccidental@example.com', hashedPassword: createPassword() }),
      r({ username: 'bellgromit', email: 'bellgromit@example.com', hashedPassword: createPassword() }),
      r({ username: 'parkourowl', email: 'parkourowl@example.com', hashedPassword: createPassword() }),
      r({ username: 'sgreentea', email: 'sgreenteaexample.com', hashedPassword: createPassword() }),
      r({ username: 'koroksheep', email: 'koroksheep@example.com', hashedPassword: createPassword() }),
      r({ username: 'goombaokra', email: 'goombaokra@example.com', hashedPassword: createPassword() }),
      r({ username: 'morcymbaldog', email: 'morecymbaldog@example.com', hashedPassword: createPassword() }),
      r({ username: 'recyclecat', email: 'recyclecay@example.com', hashedPassword: createPassword() }),
      r({ username: 'pastaman', email: 'pastaman@example.com', hashedPassword: createPassword() }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
