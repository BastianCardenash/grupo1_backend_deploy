'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un chat pertenece a un unico par de usuarios
      Chat.belongsTo(models.User, {
        foreignKey: 'userId1',
      });
      Chat.belongsTo(models.User, {
        foreignKey: 'userId2',
      });
      // Un chat tiene muchos mensajes
      Chat.hasMany(models.Message, {
        foreignKey: 'id',
      });
    }
  }
  Chat.init({
    userId1: DataTypes.INTEGER,
    userId2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};