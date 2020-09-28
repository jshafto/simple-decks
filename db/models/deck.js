'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('Deck', {
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    private: DataTypes.BOOLEAN
  }, {});
  Deck.associate = function(models) {
    // associations can be defined here
    Deck.belongsTo(models.Category, {foreignKey: "categoryId"});
    Deck.belongsTo(models.User, { foreignKey: "userId" })
    Deck.hasMany(models.Score, {
      foreignKey: "deckId",
      onDelete: "cascade"
    })
    Deck.hasMany(models.Card, {
      foreignKey: "deckId",
      onDelete: "cascade"
  })

  };
  return Deck;
};
