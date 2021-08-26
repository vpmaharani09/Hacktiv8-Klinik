const express = require("express");

const doctorRouter = express.Router();
const { Doctor } = require('../controllers/doktorImam');

doctorRouter
	.get("/", Doctor.allFindDoctor)
	.get("/add", (req, res) => {})
	.post("/add", (req, res) => {})
	.get("/:id/edit", (req, res) => {})
	.post("/:id/edit", (req, res) => {})
	.get("/:id/delete", (req, res) => {});
module.exports = { doctorRouter };
