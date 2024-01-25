const {
  Model,
  DataTypes,
  Sequelize
} = require('sequelize');
const {
  CUSTOMER_TABLE
} = require('./customer.model');

const ORDER_TABLE = 'orders';

const orderSchema = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  createdAt: {
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0);
      }
      return 0;
    }
  }
}

class Order extends Model {
  static associate(models) {

    this.belongsTo(models.Customer, {
      as: 'customer'
    });

    // this.hasMany(models.Order, {
    //   as: 'orders',
    //   foreignKey: 'customer_id'
    // });

    this.belongsToMany(models.Product, {
      as: 'items',
      // significa através de qué tabla se va a resolver la relación
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = {
  Order,
  orderSchema,
  ORDER_TABLE
}
