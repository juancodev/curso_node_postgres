//const boom = require('@hapi/boom');

const {
  models
} = require('./../libs/sequelize');

class OrderService {

  constructor() {}
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newOrderProduct = await models.OrderProduct.create(data);
    return newOrderProduct;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      // asosiacion anidada para mostrar el cliente y su usuario
      include: [{
          association: 'customer',
          include: ['user']
        },
        'items'
      ],
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return {
      id
    };
  }

}

module.exports = OrderService;
