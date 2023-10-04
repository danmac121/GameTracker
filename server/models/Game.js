const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedGames` array in User.js

const gameSchema = new Schema({

  title: {
      type: String,
      required: true,
  },
  // saved book id from GB API
  gameId: {
    type: Number,
    required: true,
  },
    description: {
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
  },
  releaseDate: {
    type: Date,
  },
  platform: {
    type: String,
  },
  completionTasks: {
    type:[String],
},
});



module.exports = gameSchema;
