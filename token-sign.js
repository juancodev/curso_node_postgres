const jwt = require('jsonwebtoken');

// IMPORTANTE: Debemos tener una llave secreta que nos permita firmar el token y debe ser variable de entorno
const secret = 'myCat';

// Los datos a mandar al servidor
const payload = {
  // subject o dueño del token: es cómo vamos a identificar al usuario
  sub: 1,

  //scope o roles, se utiliza para los permisos
  role: 'customer'
}

// crear una función que me permita generar una firma

function signTokenGenerate(payloadToken, secretToken) {
  return jwt.sign(payloadToken, secretToken);
}

const token = signTokenGenerate(payload, secret);

module.exports = token;
