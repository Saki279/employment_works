const mongoose = require("mongoose");  // mongooseをインポート
const Schema = mongoose.Schema;        // Schemaを取得

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;