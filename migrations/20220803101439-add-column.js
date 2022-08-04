'use strict';

const { Sequelize } = require("../models");
const { post } = require("../routes");

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("Posts", "Like", {
          type: Sequelize.INTEGER,
      });
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Posts", "Like",);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
