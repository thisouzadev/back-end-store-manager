const { ObjectId } = require('mongodb');
const Joi = require('@hapi/joi');
const { create } = require('../models/sales.model');
const { unprocessableEntity } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorHandling');

const salesSchema = Joi.array().items(Joi.object({
  productId: Joi.string().length(24).required(),
  quantity: Joi.number().min(1).required(),
}));
// const idSchema = Joi.string().length(24);

const createSales = async (array) => {
  const { error } = salesSchema.validate(array);
  if (error) {
    throw errorConstructor(
      unprocessableEntity, 'Wrong product ID or invalid quantity', 'invalid_data',
    );
  }
  const saleId = await create(array);

  return { _id: ObjectId(saleId), itensSold: array };
};

module.exports = {
  createSales,
};
