const {
  Strategy
} = require('passport-local');

const AuthServices = require('./../../../services/auth.service');

const service = new AuthServices();

//  Podemos pasarle opciones antes de hacer toda la estrategia

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {

  try {
    const user = await service.getUser(email, password);

    done(null, user);

  } catch (error) {
    // Si hay algún error se debe establecer la funcion done y pasarle el argumento como error y false
    done(error, false)
  }
});

module.exports = LocalStrategy;
