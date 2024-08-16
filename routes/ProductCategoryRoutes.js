const express = require('express');
const ProductCategoryController = require('../controllers/ProductCategoryController');
const ProductCategoryRoutes = express.Router();
const productCategoryController = new ProductCategoryController();

// Rotas para o controlador ProductCategoryController
ProductCategoryRoutes.post('/v1/productcategory', productCategoryController.create);
ProductCategoryRoutes.get('/v1/productcategory', productCategoryController.listAll);
ProductCategoryRoutes.get('/v1/productcategory/:id', productCategoryController.searchById);
ProductCategoryRoutes.put('/v1/productcategory/:id', productCategoryController.update);
ProductCategoryRoutes.delete('/v1/productcategory/:id', productCategoryController.delete);

module.exports = ProductCategoryRoutes;
