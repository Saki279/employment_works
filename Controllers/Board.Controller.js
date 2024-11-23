const createError = require('http-errors');
const mongoose = require('mongoose');

const Board = require('../Models/Board.model');

module.exports = {
  getAllBoards: async (req, res, next) => {
    try {
      const results = await Board.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewBoard: async (req, res, next) => {
    try {
      const board = new Board(req.body);
      const result = await board.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

    /*Or:
  If you want to use the Promise based approach*/
    /*
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err.message);
    }); 
    */
  },

  findBoardById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const board = await Board.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!board) {
        throw createError(404, 'Product does not exist.');
      }
      res.send(board);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Board id'));
        return;
      }
      next(error);
    }
  },

  updateABoard: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Board.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Board does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Board Id'));
      }

      next(error);
    }
  },

  deleteABoard: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Board.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Board does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Board id'));
        return;
      }
      next(error);
    }
  }
};
