const {
  Model,
  DataTypes,
  Sequelize
} = require('sequelize');

const {
  USER_TABLE
} = require('./user.model')

const CUSTOMER_TABLE = "customers";

const customerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  rif: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    // acá esta la llave foranea
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }
}

class Customer extends Model {
  static associate(models) {
    /*
     * relación del modelo customer => user, es decir, la foreign key debe estar en la tabla customer
     * Se agrega un alia con {as: "nombre del alias"}
     */
    this.belongsTo(models.User, {
      as: 'user'
    })
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    }
  }
}

module.exports = {
  CUSTOMER_TABLE,
  customerSchema,
  Customer,
}
