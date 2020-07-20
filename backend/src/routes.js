const express = require('express');
const routes = express.Router();
const userController = require('./controllers/userController');

routes.post('/users', userController.storeUser);

routes.get('/users', userController.searchAll);
routes.get('/userIndex', userController.searchByIndex);

routes.put('/users', userController.updateUser);

routes.delete('/users', userController.deleteUser);

module.exports = routes;
