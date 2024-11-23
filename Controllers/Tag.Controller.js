const createError = require('http-errors');
const mongoose = require('mongoose');

const Tag = require('../Models/Tag.model');

module.exports = {
  getAllTags: async (req, res, next) => {
    try {
      const results = await Tag.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewTag: async (req, res, next) => {
    try {
      const tag = new Tag(req.body);
      const result = await tag.save();
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

  findTagById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const tag = await Tag.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!tag) {
        throw createError(404, 'Tag does not exist.');
      }
      res.send(tag);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Tag id'));
        return;
      }
      next(error);
    }
  },

  updateATag: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Tag.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Tag does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Tag Id'));
      }

      next(error);
    }
  },

  deleteATag: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Tag.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Tag does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Tag id'));
        return;
      }
      next(error);
    }
  }
};
