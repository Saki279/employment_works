const createError = require('http-errors');
const mongoose = require('mongoose');

const Image = require('../Models/Image.model');

module.exports = {
  getAllImages: async (req, res, next) => {
    try {
      const results = await Image.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewImage: async (req, res, next) => {
    try {
      const image = new Image(req.body);
      const result = await image.save();
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

  findImageById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const image = await Image.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!image) {
        throw createError(404, 'Image does not exist.');
      }
      res.send(image);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Image id'));
        return;
      }
      next(error);
    }
  },

  updateAImage: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Image.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Image does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Image Id'));
      }

      next(error);
    }
  },

  deleteAImage: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Image.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Image does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Image id'));
        return;
      }
      next(error);
    }
  }
};
