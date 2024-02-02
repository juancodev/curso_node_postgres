const jwt = require('jsonwebtoken');
const token = require('./token-sign');

const secret = 'myCat';

// Esta función me permite verificar el token generado con la información necesaria y eso se aplica con jwt.verify()

function verifyToken(tokenGenerated, secretToken) {
  return jwt.verify(tokenGenerated, secretToken);
}

// retornamos el valor verificado por la función y guardamos toda la información en la variable payload
const payload = verifyToken(token, secret);

console.log(payload); // { sub: 1, role: 'customer', iat: 1706853528 } respuesta | iat = momento en que se generó el token
