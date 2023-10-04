const fetch = require('node-fetch');
const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const API_ENDPOINT = 'https://www.giantbomb.com/api/search/';
const API_KEY = process.env.API_KEY;
console.log(API_KEY)

const resolvers = {
  Query: {
    //query the single user based on their logged in status
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
      }
      throw AuthenticationError;
    },

    searchGames: async (_, { query }) => {
      console.log("hitting searchGames")
      const response =await fetch(`${API_ENDPOINT}?api_key=${API_KEY}&format=json&query=${query}&resources=game`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }});
        const data = await response.json();
        const  games =  data.results.map(game => ({
          id: game.id,
          name: game.name,
          deck: game.deck,
          image: game.image.medium_url,
          platforms: game.platforms.map(platforms => ({ name: platforms.name }))
        }));
        console.log(games);
        return games;
  },
  },
  Mutation: {
    //create a new user and sign a token for that user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    //log in the user with the appropriate credentials, sign a token
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    //if user is logged in, save a book to user's saved books
    saveBook: async (parent, { savedData }, context) => {
      console.log("hitting saveBook")
      if (context.user) {
       
        const update = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: savedData } },
          { new: true}
        )
        
        return update;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    //remove a book from savedbooks
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
       

       const removeBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: {bookId} } },
          { new: true}
        );

        return removeBook;
      }
      throw AuthenticationError;
    }
  },
};

module.exports = resolvers;
