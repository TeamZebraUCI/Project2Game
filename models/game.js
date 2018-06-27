module.exports = function(sequelize, DataTypes) {
  const Game = sequelize.define('Game', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return Game;
};
