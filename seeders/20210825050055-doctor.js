'use strict';
const fs = require("fs");

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = JSON.parse(fs.readFileSync("./doctor.json", "utf-8"));
    data.forEach(element => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    console.log(data , "data<<")
    return queryInterface.bulkInsert("Doctors", data);
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Doctors", null, {});
  }
};
