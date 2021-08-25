const express = require("express");

const patientRouter = express.Router();

patientRouter.get('/', (req, res) => { res.send("patient home")})
    .get('/add', (req, res) => { })
    .post('/add', (req, res) => {})
    .get('/:id/edit', (req, res) => { })
    .post('/:id/edit', (req, res) => {})
    .get('/:id/delete', (req, res) => {})
module.exports = {patientRouter};