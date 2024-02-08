const express = require('express');
const passport = require('passport');
const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler.js');

const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema
} = require('./../schemas/order.schema.js');

const router = express.Router();
const service = new OrderService();

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const {
        id
      } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);


router.post('/',
  passport.authenticate('jwt', {
    session: false
  }),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      // acá vamos a obtener el id del usuario subscrito a la sesión
      const body = {
        userId: req.user.sub,
      };
      const newOrder = await service.create(body)
      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  });

router.post('/add-item ',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body)
      res.status(201).json(newItem);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
