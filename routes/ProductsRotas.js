const express = require('express');
const ProductController = require('../controllers/ProductController');
const ProducstRotas = express.Router();
const productController = new ProductController();

ProducstRotas.get('/v1/product/pesquisar', productController.pesquisar);
ProducstRotas.get('/v1/product/:id', productController.listar);
ProducstRotas.post('/v1/product', productController.criar);
ProducstRotas.put('/v1/product/:id', productController.atualizar);
ProducstRotas.delete('/v1/product/:id', productController.deletar);

module.exports = ProducstRotas;
