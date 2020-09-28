'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      front: {
        allowNull: false,
        type: Sequelize.STRING(1000),
      },
      back: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      deckId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Decks" },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cards');
  }
};
