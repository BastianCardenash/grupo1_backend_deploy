'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un post tiene muchos comentarios
      Post.hasMany(models.Comment, {
        foreignKey: 'id'
      });
      // Un post solo pertenece a un solo usuario
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};