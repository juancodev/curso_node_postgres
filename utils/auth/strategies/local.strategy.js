const {
  Strategy
} = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserServices = require('./../../../services/user.service');

const service = new UserServices();

//  Podemos pasarle opciones antes de hacer toda la estrategia

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await service.findByEmail(email);

    if (!user) {
      done(boom.unauthorized(), false);
    }

    // comparar la contraseña recibida con la guardada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      done(boom.unauthorized(), false)
    }
    delete user.dataValues.password;
    done(null, user);

  } catch (error) {
    // Si hay algún error se debe establecer la funcion done y pasarle el argumento como error y false
    done(error, false)
  }
});

module.exports = LocalStrategy;
