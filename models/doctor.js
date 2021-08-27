"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    getNameDr() {
      return `Dr. ${this.name}`;
    }

    static associate(models) {
      // define association here
      Doctor.belongsToMany(models.Patient, {
        through: "PatientDoctor",
        foreignKey: "DoctorId",
      });
    }
  }
  Doctor.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "name must be filled",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "gender must be filled",
          },
        },
      },
      specialist: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "specialist must be filled",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
