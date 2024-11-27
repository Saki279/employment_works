const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/User.Controller');

//Get a list of all products
router.get('/', UserController.getAllUsers);

//Create a new product
router.post('/', UserController.createNewUser);

//Get a product by id
router.get('/:id', UserController.findUserById);

//Update a product by id
router.patch('/:id', UserController.updateAUser);

//Delete a product by id
router.delete('/:id', UserController.deleteAUser);

module.exports = router;
