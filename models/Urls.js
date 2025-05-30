const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    website: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const urls = mongoose.model("urls", urlSchema);
module.exports = urls;
