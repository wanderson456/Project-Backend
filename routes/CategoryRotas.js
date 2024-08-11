const express = require('express');

const CategoryController= require('../controllers/CategoryControler')
const CategoryRotas = express.Router();
const categoryController = new CategoryController();



CategoryRotas.get('/v1/category/:id', categoryController.search)
CategoryRotas.get('/v1/category/:id', categoryController.getById)
CategoryRotas.post('/v1/category',categoryController.create)
CategoryRotas.put('/v1/category/:id',categoryController.update)
CategoryRotas.delete('/v1/category/:id',categoryController.delete)


module.exports = CategoryRotas;