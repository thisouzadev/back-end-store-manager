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
} = require('../controllers/sales.controllers');

const router = express.Router();

router.post('/products', add);
router.get('/products', getAll);
router.put('/products/:id', update);
router.get('/products/:id', getById);
router.delete('/products/:id', exclude);

router.post('/sales', addSales);
module.exports = router;
