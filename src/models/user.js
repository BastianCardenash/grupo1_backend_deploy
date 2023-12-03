'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Message, {
        foreignKey: 'id',
      });
      User.hasMany(models.Comment, {
        foreignKey: 'id',
      });
      User.hasMany(models.Post, {
        foreignKey: 'id',
      });
      User.hasMany(models.Event, {
        foreignKey: 'id',
      });
      User.hasMany(models.Chat, {
        foreignKey: 'id',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    friendsIds: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};