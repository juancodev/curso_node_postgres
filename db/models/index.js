// requerimos todos los modelos y esquemas de nuestas tablas
const {
  User,
  userSchema
} = require('./user.model');

const {
  Product,
  productSchema
} = require('./product.model');

const {
  Customer,
  customerSchema
} = require('./customer.model');


// funcion para traernos el nucleo del ORM
function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));

  // asosiacion o relacion de 1 a 1
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
};

module.exports = setupModels;
