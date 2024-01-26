const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
  dbUrl
  //dbMysqlUser,
  //dbMysqlPassword,
  //dbMysqlPort,
} = require('../config/config');

// codificar los datos sencibles para una cadena de conexión
const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);

// const USER = encodeURIComponent(dbMysqlUser);
// const PASSWORD = encodeURIComponent(dbMysqlPassword);

// cadena de conexión remota de una db

// conexión con postgres
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

// conexión con mysql
//const URI = `mysql://${USER}:${PASSWORD}@${dbHost}:${dbMysqlPort}/${dbName}`

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres'
  },
  production: {
    url: dbUrl,
    dialect: 'postgres'
  }
}
