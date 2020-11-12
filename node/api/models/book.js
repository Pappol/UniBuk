const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  isbn: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  editor: {
    type: String,
    required: true,
  },
  validFor: [
    {
      university: String,
      course: String,
    },
  ],
  contents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  }]
});

module.exports = mongoose.model("Book", bookSchema);
