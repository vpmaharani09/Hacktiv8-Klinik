const { Doctor, Patient: patientMOdel } = require("../models/index");
const { generateNameFirstLast } = require("../helpers/helperImam");
const { checkOpenClinic ,session } = require("../helpers/helperImam")

class Patient {
  static findAllPatient(req, res) {
    patientMOdel
      .findAll({
        include: [{ model: Doctor }],
      })
      .then((data) => {
        data = data.map((el) => {
          el.age = patientMOdel.formatAge(el.age);
          return el;
        });
        session(req, res)
        res.render("patientAll", { data, pengunjung: req.session.pengunjung });
        console.log(req.session)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static addPatientGet(req, res) {
    let errors = [];

    if (req.query.errors) {
      errors = req.query.errors.split(",\n");
    }

    res.render("addPatient", { errors });
  }

  static addPatientPost(req, res) {
    let obj = req.body;
    obj.age = +obj.age;
    obj.createdAt = new Date();
    obj.updateAt = new Date();
    obj.illness = obj.illness || null;

    patientMOdel
      .create(obj)
      .then((data) => {
        res.redirect("/patient");
        // res.send(data);
      })
      .catch((err) => res.redirect(`/patient/add?errors=${err.message}`));
      // .catch(err => res.send(err.message))
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
