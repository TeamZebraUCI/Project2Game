module.exports = function(sequelize, DataTypes) {
  const Character = sequelize.define('Character', {
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
      allowNull: true,
    },
    loses: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, { fields: [ 'name', 'defense', 'attack', 'health' ] });
  //Code for foreign key
  // Characters.associate = function(models) {
  //   // Associating Characters with Users
  //   Character.hasMany(models.User, {
  //     onDelete: "cascade"
  //   });
  // };
  return Character;
};


