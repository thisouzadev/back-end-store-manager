const { ObjectId } = require('mongodb');
const Joi = require('@hapi/joi');
const { create, findByProductId } = require('../models/sales.model');
const { unprocessableEntity } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorHandling');

const productSchema = Joi.object({
  productId: Joi.string().length(24).required(),
  quantity: Joi.number().min(1).required(),
});
const idSchema = Joi.string().length(24);

const createSales = async (array) => {
  const saleId = await create(array);
  console.log(array, "services");
  return { _id: ObjectId(saleId), itensSold: array };
};

module.exports = {
  createSales,
};
