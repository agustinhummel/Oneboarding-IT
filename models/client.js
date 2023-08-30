'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      // define association here
    }
  }
  Client.init({
    nCuit: DataTypes.STRING,
    registeredOffice: DataTypes.STRING,
    sector: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    webPage:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};