'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("Posts", "Like_Id", {
          type: Sequelize.STRING,
      });
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Posts", "Like_Id",);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
