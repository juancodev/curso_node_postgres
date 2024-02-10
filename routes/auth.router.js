const express = require('express');
const passport = require('passport');

const router = express.Router();

const AuthService = require('./../services/auth.service.js');
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', {
    session: false
  }),
  async (req, res, next) => {
    try {
      const user = req.user;

      // como no hay nada asincrono en nuestro servicio de firma del token entonces podemos pasarlo directo
      res.json(service.signToken(user));

    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const {
      email
    } = req.user;
    const response = await service.sendMail(email);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/change-password', /* crear middleware de datos */ async (req, res, next) => {
  try {
    const {
      token,
      newPassword
    } = req.body;
    const response = await service.changePassword(token, newPassword);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
