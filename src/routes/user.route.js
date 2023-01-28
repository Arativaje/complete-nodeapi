const express = require('express');
const route = express.Router();
const userController = require("../controllers/user.controller");
const { myAuth } = require('../middleware/myAuth');

route.post('/register', userController.register);
route.post('/login2', userController.login2);
route.get('/users', userController.get);
route.post('/login', userController.login);
route.get('/user/:id',userController.getById)
route.put('/user/:id',userController.updateUser)

module.exports = route;