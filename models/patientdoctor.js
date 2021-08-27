"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PatientDoctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PatientDoctor.hasMany(models.Doctor, {
        foreignKey: "id",
      });
      PatientDoctor.hasMany(models.Patient, {
        foreignKey: "id",
      });
    }
  }
  PatientDoctor.init(
    {
      DoctorId: DataTypes.INTEGER,
      PatientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "patient must be select",
          },
        },
      },
      appointment: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "date must be filled",
          },
        },
      },
      isDone: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "PatientDoctor",
    }
  );
  return PatientDoctor;
};
