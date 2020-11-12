const mongoose = require("mongoose");

const contentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: Number,
    required: true,
  },
  validFor: [
    {
      university: String,
      course: String,
    },
  ],
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = mongoose.model("Content", contentSchema);
