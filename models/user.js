module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heroCount:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, { fields: [ 'userName', 'password', 'heroCount' ] });
  User.associate = function(models) {
    User.hasMany(models.Character, {
      onDelete: "cascade"
    });
  };
  return User;
};
