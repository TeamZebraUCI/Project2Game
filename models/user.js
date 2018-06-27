module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    userName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    password: DataTypes.STRING,
  });
  return Users;
};
