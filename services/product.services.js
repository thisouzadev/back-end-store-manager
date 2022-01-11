const Joi = require('@hapi/joi');
const { create, findByName } = require('../models/product.model');
const { unprocessableEntity } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorHandling');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const createProduct = async (name, quantity) => {
  const { error } = productSchema.validate({
    name, quantity,
  });

  if (error) throw errorConstructor(unprocessableEntity, error.message, 'invalid_data');

  const isProductExist = await findByName(name);

  if (isProductExist) {
    throw errorConstructor(
      unprocessableEntity,
      'Product already exists',
      'invalid_data',
    );
  }

  const id = await create(name, quantity);
  return {
    _id: id,
    name,
    quantity,
  };
};

module.exports = {
  createProduct,
};
