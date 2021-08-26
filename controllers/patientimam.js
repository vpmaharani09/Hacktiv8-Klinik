const { Doctor, Patient: patientMOdel } = require("../models/index");
const { generateNameFirstLast } = require("../helpers/helperImam");
class Patient {
	static findAllPatient(req, res) {
		patientMOdel
			.findAll({
				include: [{ model: Doctor }],
			})
			.then((data) => {
				res.render("patientAll", { data });
				//res.send(data);
				//console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	static addPatientGet(req, res) {
		res.render("addPatient");
	}

	static addPatientPost(req, res) {
		//console.log(res.body);
		//res.send(req.body);
		let obj = req.body;
		obj.age = +obj.age;
		obj.createdAt = new Date();
		obj.updateAt = new Date();
		obj.illness = obj.illness || null;
		console.log(obj);
		patientMOdel
			.create(obj)
			.then((data) => {
				res.redirect("/patient");
			})
			.catch((err) => {
				res.send(err);
				console.log(err);
			});
	}
	static searchPatientPost(req, res) {
		let { search } = req.body;
		console.log(search);
		patientMOdel
			.findAll({
				where: generateNameFirstLast(search),
			})
			.then((data) => {
				res.render("patientAll", { data });
			});
	}
	
}

module.exports = { Patient };
