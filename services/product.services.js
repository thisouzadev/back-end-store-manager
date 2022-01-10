const Joi = require('joi');
const { create } = require('../models/product.model');
const { unprocessableEntity } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorHandling');

const productSchema = Joi.object({
  name: Joi.string().min(5).required,
  quantity: Joi.number().min(0).required,
});

const createProduct = async (name, quantity) => {
  const { error } = productSchema.validate({
    name, quantity,
  });
console.log('cheguei aqui');
  if (error) throw errorConstructor(unprocessableEntity, error.message, 'Invalid_Data');
  const id = await create(name, quantity);
  return { id, name, quantity };
};

module.exports = {
  createProduct,
};
