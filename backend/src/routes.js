const express = require('express');
const routes = express.Router();
const userController = require('./controllers/userController');

routes.post('/users', userController.storeUser);

routes.get('/users', userController.searchAll);
routes.get('/users/id', userController.searchIndex);

routes.put('/users', userController.updateUser);

module.exports = routes;
