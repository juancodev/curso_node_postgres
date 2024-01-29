const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

// const getConnection = require('../libs/postgres.js');
//const pool = require('../libs/postgres.pool.js');
const {
  models
} = require('../libs/sequelize.js');

class UserService {
  constructor() {
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    // encriptamos nuestra contraseña
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });

    // eliminar el valor del password
    delete newUser.dataValues.password;

    return newUser;
  }

  async find() {
    const response = await models.User.findAll({
      include: ['customer']
    });

    return response;
  }

  async findOne(id) {
    // creamos la variable que nos va a buscar a ese id en específico.
    const user = await models.User.findByPk(id);

    // validamos si existe ese usuario
    if (!user) {
      throw boom.notFound('User not found!!');
    }

    return user;
  }

  async update(id, changes) {
    //Código repetido sin sentido
    // const user = await models.User.findByPk(id);

    //Código con programación orientada a objecto
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    //Código repetido sin sentido
    // const user = await models.User.findByPk(id);

    //Código con programación orientada a objecto
    const user = await this.findOne(id);
    await user.destroy();
    return {
      id
    };
  }
}

module.exports = UserService;
