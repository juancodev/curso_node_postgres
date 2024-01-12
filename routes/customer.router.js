const express = require('express');

const CustomerService = require('./../services/customer.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
} = require('./../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const getOnlyCustomer = await service.findOne(id);
      res.json(getOnlyCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const change = req.body;
      const {
        id
      } = req.params;
      const updateCustomer = await service.update(id, change);
      res.status(200).json(updateCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const {
        id
      } = req.params;
      await service.delete(id);
      res.status(200).json({
        id
      })
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
