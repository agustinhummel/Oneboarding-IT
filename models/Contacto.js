'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contacto extends Model {
    static associate(models) {
    }
  };
  Contacto.init({
    nombre: DataTypes.STRING(45),
    apellido: DataTypes.STRING(45),
    email: DataTypes.STRING(60),
    titulo:DataTypes.STRING(100),
    mensaje: DataTypes.STRING(1000),
    fecha:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
      }, {
    sequelize,
    paranoid: true,
    timestamps: false,
    modelName: 'Contacto',
  })
  return Contacto;
};