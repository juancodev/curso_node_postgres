const {
  Sequelize
} = require('sequelize');

const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
} = require('../config/config');
const setupModels = require('../db/models');

// codificar los datos sencibles para una cadena de conexión
const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);

// cadena de conexión remota de una db
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

setupModels(sequelize);

// Va a tomar esos modelos y creará la tabla con los compos pero si existen los datos no se reemplaza
sequelize.sync();

module.exports = sequelize;
