const { ObjectId } = require('mongodb');
const Joi = require('@hapi/joi');
const { create, findAll, findByIdMongo } = require('../models/sales.model');
const { unprocessableEntity, notFound } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorHandling');

const salesSchema = Joi.array().items(Joi.object({
  productId: Joi.string().length(24).required(),
  quantity: Joi.number().min(1).required(),
}));
const idSchema = Joi.string().length(24);

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

const findAllSales = async (productId, quantity) => {
  const getAllSales = await findAll(productId, quantity);
  if (!getAllSales) {
    throw errorConstructor(
      notFound, 'Sale not found', 'not_found',
    );
  }
  return getAllSales;
};

const findById = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) throw errorConstructor(notFound, 'Sale not found', 'not_found');
  const sales = await findByIdMongo(id);
  if (!sales) throw errorConstructor(notFound, 'Sale not found', 'not_found');
  return sales;
};

module.exports = {
  createSales,
  findAllSales,
  findById,
};
