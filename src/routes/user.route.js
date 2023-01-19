const express = require('express');
const route = express.Router();
const userController = require("../controllers/user.controller");


route.post('/register',userController.register);
route.get('/users',userController.get);

module.exports = route;