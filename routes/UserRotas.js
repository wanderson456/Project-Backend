const express = require('express');

const UserController= require('../controllers/UserController')
const UserRotas = express.Router();
const userController = new UserController();



UserRotas.get('/users/:id', userController.listar)
UserRotas.post('/users', userController.criar)
UserRotas.put('/users/:id',userController.atualizar)
UserRotas.delete('/users/:id',userController.deletar)


module.exports = UserRotas;