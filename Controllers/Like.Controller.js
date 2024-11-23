const createError = require('http-errors');
const mongoose = require('mongoose');

const Like = require('../Models/Like.model');

module.exports = {
  getAllLikes: async (req, res, next) => {
    try {
      const results = await Like.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewLike: async (req, res, next) => {
    try {
      const like = new Like(req.body);
      const result = await like.save();
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

  findLikeById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const like = await Like.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!like) {
        throw createError(404, 'Like does not exist.');
      }
      res.send(like);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Like id'));
        return;
      }
      next(error);
    }
  },

  updateALike: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Like.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Like does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Like Id'));
      }

      next(error);
    }
  },

  deleteALike: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Like.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Like does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Like id'));
        return;
      }
      next(error);
    }
  }
};
