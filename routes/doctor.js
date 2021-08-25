const express = require("express");

const doctorRouter = express.Router();

doctorRouter
  .get("/", (req, res) => {
    res.render("web");
  })
  .get("/add", (req, res) => {})
  .post("/add", (req, res) => {})
  .get("/:id/edit", (req, res) => {})
  .post("/:id/edit", (req, res) => {})
  .get("/:id/delete", (req, res) => {});

module.exports = { doctorRouter };
