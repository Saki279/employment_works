const createError = require('http-errors');
const mongoose = require('mongoose');

const ImageTag = require('../Models/ImageTag.model');

module.exports = {
  getAllImageTags: async (req, res, next) => {
    try {
      const results = await ImageTag.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewImageTag: async (req, res, next) => {
    try {
      const imagetag = new ImageTag(req.body);
      const result = await imagetag.save();
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

  findImageTagById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const imagetag = await ImageTag.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!imagetag) {
        throw createError(404, 'ImageTag does not exist.');
      }
      res.send(imagetag);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid ImageTag id'));
        return;
      }
      next(error);
    }
  },

  updateAImageTag: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await ImageTag.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'ImageTag does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid ImageTag Id'));
      }

      next(error);
    }
  },

  deleteAImageTag: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await ImageTag.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'ImageTag does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid ImageTag id'));
        return;
      }
      next(error);
    }
  }
};
