const express = require("express");
const router = express.Router();
const { doctorRouter } = require('../routes/doctor');
const { patientRouter } = require('../routes/patient');

router.get('/', (req, res) => {
    res.send("home")
})



router.use("/patient", patientRouter);
router.use("/doctor", doctorRouter);

module.exports = router;