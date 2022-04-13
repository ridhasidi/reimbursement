"use strict";

const fs = require("fs");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    let status = JSON.parse(fs.readFileSync("./data/status.json", "utf8"));
    status.forEach((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Statuses", status, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Statuses", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
