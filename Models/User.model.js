// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ProductSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   }
// });

// const Product = mongoose.model('product', ProductSchema);
// module.exports = Product;


const mongoose = require("mongoose");  // mongooseをインポート
const Schema = mongoose.Schema;        // Schemaを取得

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profilePictureUrl: String,
  bio: String,
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;