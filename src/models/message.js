'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un mensaje solo pertenece a un usuario y a un chat
      Message.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      Message.belongsTo(models.Chat, {
        foreignKey: 'chat_id',
      });
    }
  }
  Message.init({
    user_id: DataTypes.INTEGER,
    chat_id: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};