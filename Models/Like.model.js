const mongoose = require("mongoose");  // mongooseをインポート
const Schema = mongoose.Schema;        // Schemaを取得

const LikeSchema = new Schema({
  imageId: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;