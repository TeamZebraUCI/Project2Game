module.exports = function(sequelize, DataTypes) {
  const Character = sequelize.define('Character', {
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
      allowNull: true,
      defaultValue: 0,
    },
    loses: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, { fields: [ 'name', 'defense', 'attack', 'health' ] });
  return Character;
  //Code for foreign key
  Character.associate = function(models) {
   //Associating Characters with Users
    Character.belongsTo(User);
  };
  
};


