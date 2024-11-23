const mongoose = require("mongoose");  // mongooseをインポート
const Schema = mongoose.Schema;        // Schemaを取得

const ImageEditSchema = new Schema({
  imageId: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  editData: { type: Map, of: String },
}, { timestamps: true });

const ImageEdit = mongoose.model("ImageEdit", ImageEditSchema);
module.exports = ImageEdit;