'use strict';
module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return Users;
};
