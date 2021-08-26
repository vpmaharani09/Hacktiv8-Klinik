const { Doctor:DoctorModel, Patient: patientMOdel } = require("../models/index");

class Doctor{
    static allFindDoctor(req, res) {
    DoctorModel
        .findAll({
            include: [{ model: patientMOdel }],
        })
        .then((data) => {
            res.render("listDokter", { data });
        })
        .catch((err) => {
            console.log(err);
        });
    }

}

module.exports = { Doctor };