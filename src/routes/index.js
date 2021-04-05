const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// ==> Rotas da API

router.get('/products', productController.index);
router.get('/products/:id', productController.showProduct);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;