const express = require("express");
const DoctorController = require("../controllers/doctorRani");
const { generateNameFirstLast , checkOpenClinic ,session} = require("../helpers/helperImam")

const doctorRouter = express.Router();
const { Doctor } = require("../controllers/doktorImam");

doctorRouter
  .get("/", checkOpenClinic, Doctor.allFindDoctor)
  .get("/add", DoctorController.addDoctor)
  .post("/add", DoctorController.postAddDoctor)
  .get("/appointment/:id", DoctorController.getAddAppointment)
  .post("/appointment/:id", DoctorController.postAddAppointment)
  .get("/appointment/:id/done", DoctorController.isDone)

module.exports = { doctorRouter };
