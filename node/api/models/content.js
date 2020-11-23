const mongoose = require("mongoose");


// This is the model page for the content in the database
    /*
      this model is similar to the book model has all the data to be recognised including the creator, like books it has the information
      of univeristies and courses, tags and the commets of the users

      a big difference from the books is that the contents contains references to the books like a bibliography 
    */
   

const contentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  contentImage: {
    type: String,
    required: true
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

module.exports = mongoose.model("Content", contentSchema);
