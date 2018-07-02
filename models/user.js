module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(25),
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
  return User;
};
