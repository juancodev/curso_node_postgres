'use strict';

const {
  PRODUCT_TABLE,
  productSchema
} = require('./../models/product.model');

const {
  CUSTOMER_TABLE,
  customerSchema
} = require('./../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(PRODUCT_TABLE, productSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, customerSchema);
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
