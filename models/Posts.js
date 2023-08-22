"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    //   enabled: DataTypes.BOOLEAN,
      initialDate: DataTypes.DATE,
      finalDate: DataTypes.DATE 
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "Post",
    }
  );
  return Post;
};