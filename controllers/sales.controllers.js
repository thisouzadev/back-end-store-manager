const {
  createSales,
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
  try {
    const array = req.body;
    const newSales = await createSales(array);
    return res.status(success).json(newSales);
  } catch (error) {
    console.log(`POST CREATESALES -> ${error.message}`);
    return next(error);
  }
};

module.exports = {
  addSales,
};
