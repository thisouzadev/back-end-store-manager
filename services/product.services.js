const Joi = require('@hapi/joi');
const { ObjectId } = require('mongodb');
const { create, findByName,
  findAll, findById, updateProduct,
  excludeProduct } = require('../models/product.model');
const { unprocessableEntity } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorHandling');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const idSchema = Joi.string().length(24);

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

  const { _id } = await create(name, quantity);
  return {
    _id,
    name,
    quantity,
  };
};

const findAllProducts = async (name, quantity) => {
  const showAllProducts = await findAll(name, quantity);

  return showAllProducts;
};

const findByIdMongo = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) throw errorConstructor(unprocessableEntity, 'Wrong id format', 'invalid_data');
  const product = await findById(id);

  return product;
};

const productUpdate = async (id, name, quantity) => {
  const { error } = productSchema.validate({
    name, quantity,
  });
  if (error) throw errorConstructor(unprocessableEntity, error.message, 'invalid_data');
  const product = await updateProduct(id, name, quantity);

  return product;
};

const productExclude = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) throw errorConstructor(unprocessableEntity, 'Wrong id format', 'invalid_data');
  const product = await findById(id);
  if (!product) throw errorConstructor(unprocessableEntity, 'Wrong id format', 'invalid_data');
  await excludeProduct(id);

  return product;
};

module.exports = {
  createProduct,
  findAllProducts,
  findByIdMongo,
  productUpdate,
  productExclude,
};
