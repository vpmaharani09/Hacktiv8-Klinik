'use strict';
const fs = require("fs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = JSON.parse(fs.readFileSync("./patient.json", "utf-8"));
    data.forEach(element => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    console.log(data , "data<<")
    return queryInterface.bulkInsert("Patients", data);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Patients", null, {});
  }
};
