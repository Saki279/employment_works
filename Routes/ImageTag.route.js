const express = require('express');
const router = express.Router();

const ImageTagController = require('../Controllers/ImageTag.Controller');

//Get a list of all products
router.get('/', ImageTagController.getAllImageTags);

//Create a new product
router.post('/', ImageTagController.createNewImageTag);

//Get a product by id
router.get('/:id', ImageTagController.findImageTagById);

//Update a product by id
router.patch('/:id', ImageTagController.updateAImageTag);

//Delete a product by id
router.delete('/:id', ImageTagController.deleteAImageTag);

module.exports = router;
