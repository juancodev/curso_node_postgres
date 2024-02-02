const passport = require('passport');
// nos traemos las diferentes estrategias que queramos imprimir
const LocalStrategy = require('./strategies/local.strategy');

passport.use(LocalStrategy)
