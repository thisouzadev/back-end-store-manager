const express = require('express');
const { add,
  getAll,
  getById,
  update,
} = require('../controllers/product.controllers');

const router = express.Router();

router.post('/products', add);
router.get('/products', getAll);
router.put('/products/:id', update);
router.get('/products/:id', getById);

module.exports = router;
