'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {
    static associate(models) {
      // define association here
    }
  }
  Clientes.init({
    nombres: DataTypes.STRING(45),
    apellidos: DataTypes.STRING(50),
    dni: DataTypes.STRING(8),
    fecha_nac: DataTypes.DATE,
    celular: DataTypes.STRING(20),
    domicilio: DataTypes.STRING(200),
    email: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    clave: DataTypes.STRING(1000),
    nroafiliado: DataTypes.STRING(20),
    fechaalta: DataTypes.DATE,
    encargadoalta: DataTypes.STRING(45),
    edad: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Clientes',
    timestamps: false
  });
  return Clientes;
};