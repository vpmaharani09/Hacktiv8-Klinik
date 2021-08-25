const { Patient } = require("../models");

class PatientController {
  static getEditPatient(req, res) {
    let errors = null;

    if (req.query.errors) {
      errors = req.query.errors.split(",\n");
    }

    res.render("editPatient", errors);
  }

  static postEditPatient(req, res) {
    const id = req.params.id;
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
          id,
        },
      }
    )
      .then(() => res.redirect("/patient"))
      .catch((err) => res.send(err));
  }
}

module.exports = PatientController;
