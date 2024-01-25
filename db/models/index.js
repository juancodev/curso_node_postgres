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

const {
  categorySchema,
  Category
} = require('./category.model');

const {
  orderSchema,
  Order
} = require('./order.model');

const {
  OrderProduct,
  orderProductSchema
} = require('./order-product.model')


// funcion para traernos el nucleo del ORM
function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Category.init(categorySchema, Category.config(sequelize));
  Order.init(orderSchema, Order.config(sequelize));
  OrderProduct.init(orderProductSchema, OrderProduct.config(sequelize));


  // asosiacion o relacion de 1 a 1
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);

  // asosiacion o relacion de 1 a muchos
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);

  // associacion o relacion de muchos a muchos
  Order.associate(sequelize.models);
};

module.exports = setupModels;
