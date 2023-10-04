const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  deck: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  platforms: {
    type: Array,
  },
  
});

const Platforms = new Schema({
  name: {
    type: String,
  }
})

module.exports = bookSchema;
module.exports = Platforms;
