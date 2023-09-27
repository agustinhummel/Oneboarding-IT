"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Vacantes extends Model {
    static associate(models) {

    }
  }
  Vacantes.init(
    {
      skills: DataTypes.STRING(500),
      descripcion: DataTypes.STRING(3000),
      fecha_alta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      fecha_modif: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      paranoid: true,
      timestamps: false,
      modelName: "Vacantes",
    }
  );

  // Definir un gancho (hook) antes de actualizar
  Vacantes.beforeUpdate((vacante, options) => {
    vacante.fecha_modif = new Date();
  });

  return Vacantes;
};
