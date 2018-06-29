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
      type: DataTypes.STRING,
      allowNull: true
    }
  }, { fields: [ 'userName', 'password', 'heroCount' ] });
  return User;
};
