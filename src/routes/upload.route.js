const express = require('express');
const uploadRouter = express.Router();
const uploadController = require("../controllers/upload.controller");
const multer = require('multer');
const upload = multer({dest:"./uploads"});


uploadRouter.post('/upload',upload.single('photo'),uploadController.upload);

module.exports = uploadRouter;