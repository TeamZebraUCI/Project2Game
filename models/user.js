module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { fields: [ 'username', 'password' ] });
  return Users;
};
