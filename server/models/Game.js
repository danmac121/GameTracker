const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedGames` array in User.js

const gameSchema = new Schema({

  name: {
      type: String,
      required: true,
  },
  // saved book id from GB API
  gameId: {
    type: Number,
    required: true,
  },
    deck: {
      type: String,
    },
  image: {
    type: String,
  },
  genre: {
    type: String,
  },
  gameplayStatus: {
    type: String,
    default: 'in progress'
  },
  releaseDate: {
    type: Date,
  },
  platform: {
    type: Array,
  },
  completionTasks: {
    type:[String],
},
});

const Platforms = new Schema({
  name: {
    type: String,
  }
})

module.exports = gameSchema

