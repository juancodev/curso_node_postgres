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

    delete user.dataValues.recoveryToken;

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

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      boom.unauthorized();
    }

    //TODO: linea a probar
    jwt.verify(user.recoveryToken, jwtSecret, (err) => {
      if (!err) {
        throw boom.badRequest('You already have a active token');
      }
    })

    // en esta lógica aplicamos solamente el suscriptor
    const payload = {
      sub: user.id
    };

    // generamos un token firmado con expiración de 15 minutos
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: '15min '
    });

    // generamos un link para la vista de recuperación de contraseña que se le envía un query en la url
    const link = `http://myfrontend.com/recovery?token=${token}`;

    // esperamos a que se actualice en la tabla de nuestro usuario el registro del token
    await service.update(user.id, {
      recoveryToken: token
    })

    // información sobre quién envia, recibe y el cuerpo del correo
    const mail = {
      from: process.env.USER_EMAIL,
      to: `${user.email}`,
      subject: "Mensaje de recuperación de contraseña",
      text: "Clave de recuperación",
      html: `
        <b>link de recuperación 🔐 =></b>
        <br>
        <a href="${link}" target="_blank">Generar nueva contraseña</a>
      `
    };

    const response = await this.sendMail(mail)
    return response;
  };

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, jwtSecret);
      const user = await service.findOne(payload.sub);

      // comprobamos si el token que estamos agregando es el mismo que se guardó en la base de datos
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      // crear nuevamente el hash de la contraseña
      const hash = await bcrypt.hash(newPassword, 10);

      // actualizamos los campos en la base de datos
      await service.update(user.id, {
        recoveryToken: null,
        password: hash
      });

      return {
        message: 'password changed'
      }
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL_APP
      }
    });

    await transporter.sendMail(infoMail);

    return {
      message: "mail sent"
    };
  }
}

module.exports = AuthService;
