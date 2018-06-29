module.exports = function(sequelize, DataTypes) {
  const Hero = sequelize.define('Hero', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    health: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    loses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    owner:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { fields: [ 'name', 'defense', 'attack', 'health', "owner"] });
  return Hero;
};


