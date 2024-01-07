const {
  Pool
} = require('pg');

const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
  dbPort,
} = require('../config/config');

// codificar los datos sencibles para una cadena de conexión
const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);

// cadena de conexión remota de una db
const URI = `postgres://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}`;

// pooling nos permite hacer una sola conexión a nuestra db.

const pool = new Pool({
  connectionString: URI
});

module.exports = pool;
