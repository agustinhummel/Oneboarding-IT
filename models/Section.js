"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    static associate(models) {

      Section.belongsToMany(models.Professional, {
        through: "sectionProfessional",
        foreignKey : "serviceId",
        constraints:false
      });
      
    }
  }
  Section.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: "Section",
    }
  );
  return Section;
};