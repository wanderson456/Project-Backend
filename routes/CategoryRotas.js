const express = require('express');

const CategoryController= require('../controllers/CategoryControler')
const CategoryRotas = express.Router();
const categoryController = new CategoryController();



CategoryRotas.get('/v1/category/:id', categoryController.listar)
CategoryRotas.post('/v1/category',categoryController.criar)
CategoryRotas.put('/v1/category/:id',categoryController.atualizar)
CategoryRotas.delete('/v1/category/:id',categoryController.deletar)


module.exports = CategoryRotas;