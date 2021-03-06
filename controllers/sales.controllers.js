const {
  createSales,
  findAllSales,
  findById,
  salesUpdate,
  salesExclude,
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
    return res.status(success).json(product);
  } catch (error) {
    console.log(`POST GETBYIDSALES -> ${error.message}`);
    return next(error);
  }
};
const updateSales = async (req, res, next) => {
  const array = req.body;
  const { id } = req.params;
  try {
    const product = await salesUpdate(id, array);
    return res.status(success).json(product);
  } catch (error) {
    console.log(`POST UPDATESALES -> ${error.message}`);
    return next(error);
  }
};

const excludeSales = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sales = await salesExclude(id);
    return res.status(success).json(sales);
  } catch (error) {
    console.log(`POST DELETESALES -> ${error.message}`);
    return next(error);
  }
};
module.exports = {
  addSales,
  getAllSales,
  getByIdSales,
  updateSales,
  excludeSales,
};
