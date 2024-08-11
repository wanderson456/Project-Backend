const express = require('express');
const ProductController = require('../controllers/ProductController');
const ProducstRotas = express.Router();
const productController = new ProductController();



ProducstRotas.post('/v1/product', productController.create);
ProducstRotas.get('/v1/product/search', productController.search);
ProducstRotas.get('/v1/product/', productController.listAll);
ProducstRotas.get('/v1/product/:id', productController.searchByid);
ProducstRotas.put('/v1/product/:id', productController.update);
ProducstRotas.delete('/v1/product/:id', productController.delete);

module.exports = ProducstRotas;
