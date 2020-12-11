const mongoose = require("mongoose");

// This is the model page for the users in the database
    /*
      this is the typical user class
      contains more than the typical user class
        universities credentials 
        a reference to the content that the user has created
        a reference to all the books or content saved by the user
    */

    
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
  links:{
      website: String,
      contactEmail: String,
      linkedin: String,
      gitHub: String
    },
  profileImage:{
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);