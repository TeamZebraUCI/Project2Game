module.exports = function(sequelize, DataTypes) {
  const Hero = sequelize.define('Hero', {
    name: {
      type: DataTypes.STRING,
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
<<<<<<< HEAD:models/characters.js
      allowNull: true,
=======
>>>>>>> master:models/hero.js
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
<<<<<<< HEAD:models/characters.js
  }, { fields: [ 'name', 'defense', 'attack', 'health' ] });
  return Character;
  //Code for foreign key
  Character.associate = function(models) {
   //Associating Characters with Users
    Character.belongsTo(User);
  };
  
=======
  }, { fields: [ 'name', 'defense', 'attack', 'health', "owner"] });
  return Hero;
>>>>>>> master:models/hero.js
};


