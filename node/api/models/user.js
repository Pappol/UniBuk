const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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
  verified: Boolean,
	contents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    }
  ],
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    },
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Books'
    }
  ],
  contacts: [String]
});

module.exports = mongoose.model("User", userSchema);