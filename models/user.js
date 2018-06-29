module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { fields: [ 'userName', 'password' ] });
  
  User.associate = function(models) {
    User.hasMany(models.Character, {
      onDelete: "cascade"
    });
  };

  return User;
};
