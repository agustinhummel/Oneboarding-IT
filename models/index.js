const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const conexionObj = require('../config/conexion');
const db = {};


const sequelize = new Sequelize(conexionObj.database, conexionObj.user, conexionObj.password, conexionObj);
  sequelize.authenticate()
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

  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;


module.exports=db;