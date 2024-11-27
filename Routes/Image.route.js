const express = require('express');
const router = express.Router();

const ImageController = require('../Controllers/Image.Controller');

//Get a list of all products
router.get('/', ImageController.getAllImages);

//Create a new product
router.post('/', ImageController.createNewImage);

//Get a product by id
router.get('/:id', ImageController.findImageById);

//Update a product by id
router.patch('/:id', ImageController.updateAImage);

//Delete a product by id
router.delete('/:id', ImageController.deleteAImage);

module.exports = router;
