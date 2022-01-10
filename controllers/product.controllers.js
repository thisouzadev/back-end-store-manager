const { createProduct } = require('../services/product.services');
const {
  // success,
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

module.exports = {
  productCreate,
};
