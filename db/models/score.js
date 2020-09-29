'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    userId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER,
    hits: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {});
  Score.associate = function(models) {
    Score.belongsTo(models.Deck, {foreignKey: 'deckId'});
    Score.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Score;
};
