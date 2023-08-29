'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    static associate(models) {
      // define association here
    }
  }
  client.init({
    nCuit: DataTypes.STRING,
    registeredOffice: DataTypes.STRING,
    rubro: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    webPage:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'client',
  });
  return client;
};