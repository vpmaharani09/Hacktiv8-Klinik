"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    fullName() {
      let first_name = this.first_name.toLowerCase();
      let last_name = this.last_name.toLowerCase();
      return `${first_name[0].toUpperCase()}${first_name.slice(
        1
      )} ${last_name[0].toUpperCase()}${last_name.slice(1)}`;
    }
    static associate(models) {
      // define association here
      Patient.belongsToMany(models.Doctor, {
        through: "PatientDoctor",
        foreignKey: "PatientId",
      });
    }

    static formatAge(num) {
      return `${num} tahun`;
    }
  }
  Patient.init(
    {
      first_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "first name must be filled",
          },
        },
      },
      last_name:{
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "last name must be filled",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          customValidator(value) {
            if (value <= 0 || value === null) {
              throw new Error(`minimum age is 1 and age must be filled`)
            } 
          }
        },  
      },
      illness: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "illness must be filled",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          //user.mood = "happy";
          user.first_name;
          user.last_name;
          let arrayFirstName = user.first_name.split(" ");
          arrayFirstName = arrayFirstName.filter((el) => {
            return el != "";
          });

          let arrayLastName = user.last_name.split(" ");
          arrayLastName = arrayLastName.filter((el) => {
            return el != "";
          });

          let fullName = [...arrayFirstName, ...arrayLastName];
          if (fullName.length == 1) {
            user.first_name = fullName[0];
            user.last_name = "";
          } else if (fullName.length > 1) {
            user.first_name = fullName[0];
            user.last_name = fullName.slice(1).join(" ");
          }
          console.log(user.first_name, "||", user.last_name);
        },
      },
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
