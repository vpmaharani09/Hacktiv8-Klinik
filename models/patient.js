"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Patient extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Patient.belongsToMany(models.Doctor, {
				through: "PatientDoctor",
				foreignKey: "PatientId",
			});
		}
	}
	Patient.init(
		{
			first_name: DataTypes.STRING,
			last_name: DataTypes.STRING,
			age: DataTypes.INTEGER,
			illness: DataTypes.STRING,
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
