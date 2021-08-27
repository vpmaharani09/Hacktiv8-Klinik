const { Patient, Doctor } = require("../models");
const formatDate = require("../helpers/helperRani");
const {insertEvent, dateTimeForCalander} = require("../calender")

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
        
      })
      .catch((err) => res.send(err.message));
  }

  static makeReminder(req, res) {
    const id = req.params.id

    Patient.findByPk(id, {
      include: {
        model: Doctor
      }
    })
    .then((data) => {

      let patient = null
      let doctor = ""
      let date = null

      patient = data.first_name

      data.Doctors.forEach(el => {
        doctor = el.name
        date = el.PatientDoctor.appointment.toISOString().slice(0, 10)

        
      let dateTime = dateTimeForCalander(date);

      // Event for Google Calendar
      let event = {
          'summary': `${doctor}`,
          'description': `${patient}`,
          'start': {
              'dateTime': dateTime['start'],
              'timeZone': 'Asia/Jakarta'
          },
          'end': {
              'dateTime': dateTime['end'],
              'timeZone': 'Asia/Jakarta'
          }
      };

      insertEvent(event)
          .then((res) => {
              console.log(res)
          })
          .catch((err) => {
              console.log(err);
          });
          })

        
          res.redirect("/patient")

        }

    )}
    

  }

      
    
  


module.exports = PatientController;
