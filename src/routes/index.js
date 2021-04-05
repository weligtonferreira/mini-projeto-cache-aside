const express = require('express');
const productControler = require('../controllers/productControler');

const router = express.Router();

// ==> Rotas da API

router.get('/products', productControler.index);
router.get('/products/:id', productControler.showProduct);
router.post('/products', productControler.createProduct);
router.put('/products/:id', productControler.updateProduct);
router.delete('/products/:id', productControler.deleteProduct);

module.exports = router;