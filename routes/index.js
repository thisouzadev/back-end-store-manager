const express = require('express');
const { productCreate } = require('../controllers/product.controllers');

const router = express.Router();

router.post('/products', productCreate);

module.exports = router;
