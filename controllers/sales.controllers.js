const {
  createSales,
  findAllSales,
  findById,
} = require('../services/sales.services');
const {
  success,
  // created,
  // badRequest,
  // notFound,
  // unprocessableEntity,
  // serverError,
} = require('../utils/dictionary/statusCode');

const addSales = async (req, res, next) => {
  const array = req.body;
  try {
    const newSales = await createSales(array);
    return res.status(success).json(newSales);
  } catch (error) {
    console.log(`POST CREATESALES -> ${error.message}`);
    return next(error);
  }
};
const getAllSales = async (_req, res, next) => {
  try {
    const findAll = await findAllSales();
    return res.status(success).json(findAll);
  } catch (error) {
    console.log(`POST GETALLSALES -> ${error.message}`);
    return next(error);
  }
};
const getByIdSales = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await findById(id);
    console.log(product, 'controler');
    return res.status(success).json(product);
  } catch (error) {
    console.log(`POST GETBYIDSALES -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  addSales,
  getAllSales,
  getByIdSales,
};
