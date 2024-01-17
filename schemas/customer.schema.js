const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const lastName = Joi.string();
const rif = Joi.number().integer()
const description = Joi.string().max(400);
const phone = Joi.string();
const userId = Joi.number().integer();

const {
  createUserSchema,
  updateUserSchema
} = require('./user.schema');

const getCustomerSchema = Joi.object({
  id: id.required()
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  rif: rif.required(),
  description: description,
  phone: phone.required(),
  // crear un usuario directamente creamos un cliente
  user: createUserSchema

});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  rif,
  description,
  phone,
  user: updateUserSchema,
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
}
