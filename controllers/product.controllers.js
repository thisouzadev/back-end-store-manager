const { createProduct, findAllProducts, findByIdMongo } = require('../services/product.services');
const {
  success,
  created,
  // badRequest,
  // notFound,
  // unprocessableEntity,
  // serverError,
} = require('../utils/dictionary/statusCode');

const productCreate = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await createProduct(name, quantity);
    return res.status(created).json(newProduct);
  } catch (error) {
    console.log(`POST CREATEPRODUCT -> ${error.message}`);
    return next(error);
  }
};
const getProduct = async (req, res, next) => {
  try {
    const findAll = await findAllProducts();
    return res.status(success).json({ products: findAll });
  } catch (error) {
    console.log(`POST FINDPRODUCT -> ${error.message}`);
    return next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await findByIdMongo(id);

    if (product.error) return next(product.error);
    return res.status(success).json(product);
  } catch (error) {
    console.log(`POST FINDBYIDPRODUCT -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  productCreate,
  getProduct,
  getId,
};
