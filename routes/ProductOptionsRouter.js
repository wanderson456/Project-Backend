const express = require('express');
const ProductOptionsController = require('../controllers/ProductOptionsController');
const ProducstOptionsRoutes = express.Router();
const productOptionsController = new ProductOptionsController();


ProducstOptionsRoutes.post('/v1/productoption', productOptionsController.create);
ProducstOptionsRoutes.get('/v1/productoption', productOptionsController.listAll);
ProducstOptionsRoutes.get('/v1/productoption/:id', productOptionsController.searchByid);
ProducstOptionsRoutes.put('/v1/productoption/:id', productOptionsController.update);
ProducstOptionsRoutes.delete('/v1/productoption/:id', productOptionsController.delete);

module.exports = ProducstOptionsRoutes;
