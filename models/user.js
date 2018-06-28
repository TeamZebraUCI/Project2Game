module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
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
  return Users;
};
