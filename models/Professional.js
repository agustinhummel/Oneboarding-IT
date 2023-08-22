'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Professional extends Model {
    static associate(models) {
      Professional.belongsToMany(models.Section, {
        through: "sectionProfessional",
        foreignKey : "professionalId",
        constraints:false
      });
    }
  };
  Professional.init({
    fullName: DataTypes.STRING,
    initialDate: DataTypes.DATE,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'Professional',
  })
  return Professional;
};