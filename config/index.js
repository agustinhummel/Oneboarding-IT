const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const conexionObj = require('./conexion');
const db = {};


const sequelize = new Sequelize(conexionObj.database, conexionObj.user, conexionObj.password, conexionObj);
const authenticateAndSync = () => {
  return sequelize.authenticate()
    .then(() => {
      console.log('Conectado a la db');
      return sequelize.sync();
    })
    .then(() => {
      console.log('Cambios reflejados');
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const loadModels = () => {
  const modelsDir = path.join(__dirname, '../models');
  fs
    .readdirSync(modelsDir)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};

module.exports = {
  sequelize,
  authenticateAndSync,
  loadModels
};
