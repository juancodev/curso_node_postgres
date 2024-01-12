'use strict';

const {
  CUSTOMER_TABLE,
  customerSchema
} = require('./../models/customer.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(CUSTOMER_TABLE, 'user_id', customerSchema.userId);
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'user_id');
  }
};
