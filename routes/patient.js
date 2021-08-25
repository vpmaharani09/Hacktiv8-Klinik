const express = require("express");
const { Patient: patienController } = require("../controllers/patientimam");
const PatientController = require("../controllers/patientRani");
const patientRouter = express.Router();

patientRouter
  .get("/", patienController.findAllPatient)
  .get("/add", patienController.addPatientGet)
  .post("/add", patienController.addPatientPost)
  .get("/:id/edit", (req, res) => {})
  .post("/:id/edit", (req, res) => {})
  .get("/:id/delete", (req, res) => {})
  .post("/search", patienController.searchPatientPost);
module.exports = { patientRouter };
