const express = require("express");
const DoctorController = require("../controllers/doctorRani");

const doctorRouter = express.Router();
const { Doctor } = require("../controllers/doktorImam");

doctorRouter
  .get("/", Doctor.allFindDoctor)
  .get("/add", DoctorController.addDoctor)
  .post("/add", DoctorController.postAddDoctor)
  .get("/appointment/:id", DoctorController.getAddAppointment)
  .post("/appointment/:id", DoctorController.postAddAppointment);

module.exports = { doctorRouter };
