const express = require("express");
const { Patient: patienController } = require("../controllers/patientimam");
const PatientController = require("../controllers/patientRani");
const patientRouter = express.Router();

patientRouter
  .get("/", patienController.findAllPatient)
  .get("/add", patienController.addPatientGet)
  .post("/add", patienController.addPatientPost)
  .get("/:id/edit", PatientController.getEditPatient)
  .post("/:id/edit", PatientController.postEditPatient)
  .get("/:id/delete", PatientController.deletePatient)
  .post("/search", patienController.searchPatientPost)
  .get("/myCards/:id", PatientController.getCards);
module.exports = { patientRouter };
