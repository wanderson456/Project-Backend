const express = require('express');

const UserController= require('../controllers/UserController')
const UserRotas = express.Router();
const userController = new UserController();



UserRotas.get('/v1/user/:id', userController.listar)
UserRotas.post('/v1/user', userController.criar)
UserRotas.put('/v1/user/:id',userController.atualizar)
UserRotas.delete('/v1/user/:id',userController.deletar)


module.exports = UserRotas;