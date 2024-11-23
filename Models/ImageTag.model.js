const mongoose = require("mongoose");  // mongooseをインポート
const Schema = mongoose.Schema;        // Schemaを取得

const ImageTagSchema = new Schema({
  imageId: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
  tagId: { type: Schema.Types.ObjectId, ref: 'Tag', required: true },
}, { timestamps: true });

const ImageTag = mongoose.model("ImageTag", ImageTagSchema);
module.exports = ImageTag;