// backend/routes/shopRoutes.js
const express = require('express');
const router = express.Router();
const { getProducts, addProduct } = require('../controllers/shopController');

router.get('/products', getProducts);
router.post('/add', addProduct);

module.exports = router;
