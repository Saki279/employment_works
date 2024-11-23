const mongoose = require("mongoose");  // mongooseをインポート
const Schema = mongoose.Schema;        // Schemaを取得

const BoardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
}, { timestamps: true });

const Board = mongoose.model("Board", BoardSchema);
module.exports = Board;