const express = require('express');
const {
  add,
  getAll,
  getById,
  update,
  exclude,
} = require('../controllers/product.controllers');

const router = express.Router();

router.post('/products', add);
router.get('/products', getAll);
router.put('/products/:id', update);
router.get('/products/:id', getById);
router.delete('/products/:id', exclude);
module.exports = router;
