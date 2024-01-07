// requerimos todos los modelos y esquemas de nuestas tablas
const {
  User,
  userSchema
} = require('./user.model');

const {
  Product,
  productSchema
} = require('./product.model');


// funcion para traernos el nucleo del ORM
function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
};

module.exports = setupModels;
