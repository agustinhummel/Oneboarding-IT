"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vacantes extends Model {
    static associate(models) {
      
    }
  }
  Vacantes.init(
    {
      skills: DataTypes.STRING(500),
      descripcion: DataTypes.STRING(3000),
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "Vacantes",
    }
  );
  return Vacantes;
};