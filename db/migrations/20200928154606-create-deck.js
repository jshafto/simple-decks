'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Decks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Categories" },
        onDelete: 'cascade'
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
        onDelete: 'cascade'
      },
      private: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Decks');
  }
};
