'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sectionProfessional extends Model {
  };
  sectionProfessional.init({
   serviceId: DataTypes.INTEGER,
   professionalId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'sectionProfessional',
  })
  return sectionProfessional;
};