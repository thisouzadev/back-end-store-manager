const express = require('express');
const { productCreate, getProduct, getId } = require('../controllers/product.controllers');

const router = express.Router();

router.post('/products', productCreate);
router.get('/products', getProduct);
router.get('/products/:id', getId);

module.exports = router;
