const express = require('express');
const router = express.Router();

const TagController = require('../Controllers/Tag.Controller');

//Get a list of all products
router.get('/', TagController.getAllTags);

//Create a new product
router.post('/', TagController.createNewTag);

//Get a product by id
router.get('/:id', TagController.findTagById);

//Update a product by id
router.patch('/:id', TagController.updateATag);

//Delete a product by id
router.delete('/:id', TagController.deleteATag);

module.exports = router;
