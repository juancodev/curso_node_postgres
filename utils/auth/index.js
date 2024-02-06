const passport = require('passport');
// nos traemos las diferentes estrategias que queramos imprimir
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);
