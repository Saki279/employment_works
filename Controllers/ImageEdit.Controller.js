const createError = require('http-errors');
const mongoose = require('mongoose');

const ImageEdit = require('../Models/ImageEdit.model');

module.exports = {
  getAllImageEdits: async (req, res, next) => {
    try {
      const results = await ImageEdit.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewImageEdit: async (req, res, next) => {
    try {
      const imageedit = new ImageEdit(req.body);
      const result = await imageedit.save();
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

  findImageEditById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const imageedit = await ImageEdit.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!imageedit) {
        throw createError(404, 'ImageEdit does not exist.');
      }
      res.send(imageedit);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid ImageEdit id'));
        return;
      }
      next(error);
    }
  },

  updateAImageEdit: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await ImageEdit.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'ImageEdit does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid ImageEdit Id'));
      }

      next(error);
    }
  },

  deleteAImageEdit: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await ImageEdit.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'ImageEdit does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid ImageEdit id'));
        return;
      }
      next(error);
    }
  }
};
