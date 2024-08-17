const express = require('express');
const ProductImagensController = require('../controllers/ProductImagensController');
const ProducstImageRotas = express.Router();
const productImageController = new ProductImagensController();



ProducstImageRotas.post('/v1/productimage', productImageController.create);
ProducstImageRotas.get('/v1/productimage/', productImageController.listAll);
ProducstImageRotas.get('/v1/productimage/:id', productImageController.searchByid);
ProducstImageRotas.put('/v1/productimage/:id', productImageController.update);
ProducstImageRotas.delete('/v1/productimage/:id', productImageController.delete);

module.exports = ProducstImageRotas;
