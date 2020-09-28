'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    front: DataTypes.STRING,
    back: DataTypes.STRING,
    deckId: DataTypes.INTEGER
  }, {});
  Card.associate = function(models) {
    // associations can be defined here
  };
  return Card;
};