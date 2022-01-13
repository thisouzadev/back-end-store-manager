const express = require('express');
const {
  add,
  getAll,
  getById,
  update,
  exclude,
} = require('../controllers/product.controllers');
const {
  addSales,
  getAllSales,
  getByIdSales,
} = require('../controllers/sales.controllers');

const router = express.Router();

router.post('/products', add);
router.get('/products', getAll);
router.put('/products/:id', update);
router.get('/products/:id', getById);
router.delete('/products/:id', exclude);

router.post('/sales', addSales);
router.get('/sales', getAllSales);
router.get('/sales/:id', getByIdSales);
module.exports = router;
