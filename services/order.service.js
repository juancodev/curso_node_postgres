const boom = require('@hapi/boom');

const {
  models
} = require('./../libs/sequelize');

class OrderService {

  constructor() {}
  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    })

    // si no consigue ese cliente asociado con la cuenta que hace inicio de sesion
    if (!customer) {
      throw boom.badRequest('Customer not found');
    }
    const newOrder = await models.Order.create({
      customerId: customer.id
    });
    return newOrder;
  }

  async addItem(data) {
    const newOrderProduct = await models.OrderProduct.create(data);
    return newOrderProduct;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      // asociasión compleja donde tenemos que navegar entre tablas
      where: {
        // con esta forma decimos que la tabla customer -> user -> id sea igual al id del usuario que esta intentando ingresar o que logeo en nuestra app
        '$customer.user.id$': userId
      },
      include: [{
        association: 'customer',
        include: ['user']
      }]
    });
    return orders;
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
