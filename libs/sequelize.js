const {
  Sequelize
} = require('sequelize');

const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
  // dbMysqlUser,
  // dbMysqlPassword,
  // dbMysqlPort,
} = require('../config/config');
const setupModels = require('../db/models');

// codificar los datos sencibles para una cadena de conexión
const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);

// const USER = encodeURIComponent(dbMysqlUser);
// const PASSWORD = encodeURIComponent(dbMysqlPassword);

// cadena de conexión remota de una db

// conexión con postgres
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

// conexión con mysql
// const URI = `mysql://${USER}:${PASSWORD}@${dbHost}:${dbMysqlPort}/${dbName}`

//dialect cambiarlo a la base de datos que vayamos a utilizar: postgres o mysql
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log,
});

// Mysql
// const sequelize = new Sequelize(URI, {
//   dialect: 'mysql',
//   logging: console.log,
// });

setupModels(sequelize);

// Va a tomar esos modelos y creará la tabla con los compos pero si existen los datos no se reemplaza, no se utiliza en produccion

//sequelize.sync();

module.exports = sequelize;
