module.exports = function(sequelize, DataTypes) {
  const Characters = sequelize.define('Characters', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    defense: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    health: DataTypes.INTEGER,
    wins: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    loses: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });
  return Characters;
};
