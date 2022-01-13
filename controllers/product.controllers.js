const {
  createProduct, findAllProducts, findByIdMongo, productUpdate, productExclude,
} = require('../services/product.services');
const {
  success,
  created,
  // badRequest,
  // notFound,
  // unprocessableEntity,
  // serverError,
} = require('../utils/dictionary/statusCode');

const add = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await createProduct(name, quantity);
    return res.status(created).json(newProduct);
  } catch (error) {
    console.log(`POST CREATEPRODUCT -> ${error.message}`);
    return next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const findAll = await findAllProducts();
    return res.status(success).json({ products: findAll });
  } catch (error) {
    console.log(`POST FINDPRODUCT -> ${error.message}`);
    return next(error);
  }
};

const getById = async (req, res, next) => {
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

const update = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  try {
    const product = await productUpdate(id, name, quantity);
    return res.status(success).json(product);
  } catch (error) {
    console.log(`POST UPDATEPRODUCT -> ${error.message}`);
    return next(error);
  }
};

const exclude = async (req, res, next) => {
  const { id } = req.params;
  try {
    const products = await productExclude(id);
    console.log(products, 'controller');
    return res.status(success).json(products);
  } catch (error) {
    console.log(`POST DELETEPRODUCT -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude,
};
