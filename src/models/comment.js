'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un comentario pertence a un post y a un usuario
      Comment.belongsTo(models.Post, {
        foreignKey: 'post_id',
        onDelete: 'CASCADE',
        hooks: true,
      });
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Comment.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};