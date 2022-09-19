const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    pictures: [{ type: String, required: false }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("gallery", gallerySchema);
