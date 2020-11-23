const mongoose = require("mongoose");

// This is the model page for the books in the database
    /*
      each book has all the propreties to recognise the book itself like an image and the ISBN code 
      the field validFor is a instrument to connect various universities and courses with the book for the user to 
      always find the best book for his/her course

      another foundamental filed for the book is the tags fields to guarantee better search performance and coherence

      comments are also very important for the user to choose whitch book fits the best his pourpuses
    */
   

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
  description: {
    type: String,
    required: true
  },
  bookImage: {
    type: String,
    required: true
  },
  validFor: [
    {
      university: String,
      course: String,
    },
  ],
  contents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    }
  ],
  tags: [String],
  comments: [
    {
      rank: Number,
      text: String, 
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ]
});

module.exports = mongoose.model("Book", bookSchema);
