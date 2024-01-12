const boom = require('@hapi/boom');

const {
  models
} = require('./../libs/sequelize');

class CustomerService {
  constructor() {

  }

  async create(customer) {
    const newCustomer = await models.Customer.create(customer);
    return newCustomer;
  }

  async find() {
    const response = await models.Customer.findAll();
    return response;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);

    if (!customer) {
      throw boom.notFound('customer not found!');
    }

    return customer;
  }

  async update(id, change) {
    const customer = await this.findOne(id);
    const response = await customer.update(change);
    return response;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return {
      id
    };
  }
}

module.exports = CustomerService;
