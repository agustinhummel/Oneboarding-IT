'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    static associate(models) {
    }
  };
  Usuarios.init({
    nombres: DataTypes.STRING(45),
    apellidos: DataTypes.STRING(45),
    domicilio: DataTypes.STRING(50),
    dni:{
      type:DataTypes.STRING(8),
      unique: true
    },
    email:{
      type:DataTypes.STRING(45),
      unique: true
    },
    clave: DataTypes.STRING(1000),
    fechaalta: DataTypes.DATE,
    encargadoalta: DataTypes.STRING(45),
    area_idarea: DataTypes.INTEGER,
    cargo_idcargo: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    timestamps: false,
    modelName: 'Usuarios',
  })
  return Usuarios;
};