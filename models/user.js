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
  return User;
};
