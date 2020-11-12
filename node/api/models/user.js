const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
	studentCreds: {
		university: String,
		course: String,
		year: Number
  },
  // university: String,
  // course: String,
  // year: Number,
  verified: Boolean,
	contents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  }],
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  },
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Books'
  }]
});

module.exports = mongoose.model("User", userSchema);