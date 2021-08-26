const { Patient, Doctor } = require("../models");
const formatDate = require("../helpers/helperRani");

class PatientController {
  static getEditPatient(req, res) {
    const id = req.params.id;
    let errors = null;

    if (req.query.errors) {
      errors = req.query.errors.split(",\n");
    }

    Patient.findByPk(id)
      .then((data) => {
        res.render("editPatient", { data, errors });
        // res.send(data);
      })
      .catch((err) => res.send(err.message));
  }

  static postEditPatient(req, res) {
    const id = req.params.id;
    console.log(req.body);
    let { first_name, last_name, age, illness } = req.body;

    Patient.update(
      {
        first_name: first_name,
        last_name: last_name,
        age: age,
        illness: illness,
      },
      {
        where: {
          id: id,
        },
      }
    )

      //   .then((data) => res.send(data))
      .then(() => res.redirect("/patient"))
      .catch((err) => res.send(err.message));
  }

  static deletePatient(req, res) {
    const id = req.params.id;

    Patient.destroy({
      where: {
        id: id,
      },
    })
      .then(() => res.redirect("/patient"))
      .catch((err) => res.send(err.message));
  }

  static getCards(req, res) {
    const id = req.params.id;

    Patient.findByPk(id, {
      include: {
        model: Doctor,
      },
    })
      .then((data) => {
        res.render("my-cards", { data, formatDate });
        // res.send(data);
      })
      .catch((err) => res.send(err.message));
  }
}

module.exports = PatientController;
