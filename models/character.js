module.exports = function(sequelize, DataTypes) {
  const Characters = sequelize.define('Characters', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    defense: DataTypes.UNSIGNED.ZEROFILL.INTEGER,
    attack: DataTypes.UNSIGNED.ZEROFILL.INTEGER,
    health: DataTypes.UNSIGNED.ZEROFILL.INTEGER,
    wins: {
      type: DataTypes.UNSIGNED.ZEROFILL.INTEGER,
      allowNull: true,
    },
    loses: {
      type: DataTypes.UNSIGNED.ZEROFILL.INTEGER,
      allowNull: true,
    }
  });
  return Characters;
};
