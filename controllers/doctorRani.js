const { Doctor, Patient, PatientDoctor } = require("../models");
const formatDate = require("../helpers/helperRani");

class DoctorController {
  static addDoctor(req, res) {
    let errors = [];

    if (req.query.errors) {
      errors = req.query.errors.split(",\n");
    }

    res.render("add-doctor", { errors });
  }

  static postAddDoctor(req, res) {
    let { name, gender, specialist } = req.body;
    Doctor.create({
      name: name,
      gender: gender,
      specialist: specialist,
    })
      .then(() => {
        res.redirect("/doctor");
      })
      .catch((err) => res.redirect(`/doctor/add?errors=${err.message}`));
      // .catch(err => res.send(err.message))
  }

  static getAddAppointment(req, res) {
    const id = req.params.id;
    let errors = [];

    if (req.query.errors) {
      errors = req.query.errors.split(",\n");
    }

    let doctor = null;
    let patient = null;

    Doctor.findByPk(id, {
      include: {
        model: Patient,
      },
    })
      .then((data) => {
        doctor = data;
        return Patient.findAll({
          order: [["first_name", "ASC"]],
        });
      })
      .then((data) => {
        patient = data;
        res.render("appointment", { doctor, patient, formatDate, errors });
      })
      .catch((err) => res.send(err.message));
  }

  static postAddAppointment(req, res) {
    const id = req.params.id;
    let { name, appointment } = req.body;
    console.log(req.body);

    PatientDoctor.create({
      DoctorId: id,
      PatientId: name, //value = patient.el.id
      appointment: appointment,
      isDone: false,
    })
      .then(() => res.redirect(`/doctor/appointment/${id}`))
      .catch((err) =>
        res.redirect(`/doctor/appointment/${id}?errors=${err.message}`)
      );
  }

  static isDone(req, res) {
    const id = req.params.id

    PatientDoctor.destroy({
      where: {
        DoctorId: id
      }
    })
      .then(() => {
        res.redirect(`/doctor/appointment/${id}`)
      })
      .catch(err => res.send(err.message))
  }
}

module.exports = DoctorController;
