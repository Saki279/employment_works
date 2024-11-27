const express = require('express');
const router = express.Router();

const ImageEditController = require('../Controllers/ImageEdit.Controller');

//Get a list of all products
router.get('/', ImageEditController.getAllImageEdits);

//Create a new product
router.post('/', ImageEditController.createNewImageEdit);

//Get a product by id
router.get('/:id', ImageEditController.findImageEditById);

//Update a product by id
router.patch('/:id', ImageEditController.updateAImageEdit);

//Delete a product by id
router.delete('/:id', ImageEditController.deleteAImageEdit);

module.exports = router;
