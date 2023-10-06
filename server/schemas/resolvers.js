const fetch = require('node-fetch');
const { User, Game } = require('../models');
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
          gameId: game.id,
          name: game.name,
          deck: game.deck,
          image: game.image.medium_url,
          releaseDate: game.original_release_date,
          platforms: game.platforms.map(platforms => ({ name: platforms.name }))
        }));
        console.log(games);
        return games;
  },
    getUserSavedGames: async (_, __, context) => {
      const userId = context.user._id
      const savedGames = await User.find({ _id: userId })
      return savedGames;
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

    //Add a platform to the user profile

    addPlatform: async (parent, { platform }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { platforms: platform } },
            { new: true }
          );
          return updatedUser;
        } catch (error) {
          // Handle any database or other errors here
          console.log(error)
          throw new Error("Unable to update user's platforms.");
        }
      } else {
        throw new AuthenticationError('User is not authenticated.');
      }
    },
    //add a completion task to the selected game

    addTask: async (parent, { completionTasks, gameId }, context) => {

      if (context.user) {

        const update = await User.findOneAndUpdate(

          {
            _id: context.user._id,
            "savedGames.gameId": gameId
          },
          {
            $addToSet: {
              "savedGames.$.completionTasks": completionTasks
            }
          },
          { new: true }
        ).populate('savedGames')
        return update;

      }
      throw AuthenticationError;

    },



    //add a game to the User's 'Games' page

    savedGames: async (parent, { gameData }, context) => {
      if (context.user) {

        const update = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedGames: gameData } },
          { new: true }
        )

        return update;
      }
      throw AuthenticationError;

    },
    //update the gameplay status
    updateStatus: async (parent, {gameId, newStatus}, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          {_id:context.user._id,
            'savedGames.gameId': gameId},
          {$set: {'savedGames.$.gameplayStatus': newStatus}},
          {new: true}
        )
        return user
      }
    },


    //remove a game from savedbooks
    removeGame: async (parent, { gameId }, context) => {
      if (context.user) {


        const removeGame = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedGames: { gameId } } },
          { new: true }
        );

        return removeGame;
      }
      throw AuthenticationError;
    },
  
    removeTask: async (parent, { gameId, taskCompleted }, context) => {

      if (context.user) {
        console.log(gameId, taskCompleted)
  
        const update = await User.findOneAndUpdate(
  
          {
            _id: context.user._id,
            "savedGames.gameId": gameId
          },
          {
            $pull: {
              "savedGames.$.completionTasks": taskCompleted
            }
          },
          { new: true }
        ).populate('savedGames')

        // console.log(update.savedGames, completionTasks)
        return update;
  
      }
      throw AuthenticationError;
  
    },

},
}

module.exports = resolvers;
