const mongoose = require("mongoose");  // mongooseをインポート
const Schema = mongoose.Schema;        // Schemaを取得

const ImageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  description: String,
}, { timestamps: true });

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;