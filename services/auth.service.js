require('dotenv').config();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const {
  jwtSecret
} = require('../config/config');


const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    // comparar la contraseña recibida con la guardada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, jwtSecret)

    return {
      user,
      token
    };
  }

  async sendMail(email) {

    const user = await service.findByEmail(email);
    if (!user) {
      boom.unauthorized();
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL_APP
      }
    });

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: `${user.email}`,
      subject: "Mensaje de recuperación de contraseña",
      text: "Clave de recuperación",
      html: "<b>Clave de recuperación 🔐</b>"
    });

    return {
      message: "mail sent"
    }
  }
}

module.exports = AuthService;
