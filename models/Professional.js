'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Postulantes extends Model {
    static associate(models) {
      /*Professional.belongsToMany(models.Section, {
        through: "sectionProfessional",
        foreignKey : "professionalId",
        constraints:false
      });*/
    }
  };
  Postulantes.init({
    nombres: DataTypes.STRING(45),
    apellidos: DataTypes.STRING(50),
    dni: DataTypes.STRING(8),
    fecha_nac: DataTypes.DATE,
    tel_movil: DataTypes.STRING(20),
    domicilio: DataTypes.STRING(200),
    email: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    clave: DataTypes.STRING(1000),
    fechaalta: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    encargadoalta: DataTypes.STRING(45),
  }, {
    sequelize,
    paranoid: true,
    timestamps: false,
    modelName: 'Postulantes',
  })
  return Postulantes;
};