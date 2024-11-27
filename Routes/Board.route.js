const express = require('express');
const router = express.Router();

const BoardController = require('../Controllers/Board.Controller');

//Get a list of all products
router.get('/', BoardController.getAllBoards);

//Create a new product
router.post('/', BoardController.createNewBoard);

//Get a product by id
router.get('/:id', BoardController.findBoardById);

//Update a product by id
router.patch('/:id', BoardController.updateABoard);

//Delete a product by id
router.delete('/:id', BoardController.deleteABoard);

module.exports = router;
