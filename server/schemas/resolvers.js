const { User, Game } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    //query the single user based on their logged in status
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
      }
      throw AuthenticationError;
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

    addPlatform: async (parent, {platform}, context) => {
      if (context.user) {
       console.log(context.user._id)
        try {
          console.log(platform)
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: {platforms: platform } },
            { new: true }
            );
            console.log(updatedUser)
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

    addTask: async (parent, {completionTasks}, context) => {

      if (context.user) {
       
        const update = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedGames: completionTasks } },
          { new: true}
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
          { new: true}
        )
        
        return update;
      }
      throw AuthenticationError;

    },



    //remove a game from savedbooks
    removeGame: async (parent, { gameId }, context) => {
      if (context.user) {
       

       const removeGame = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedGames: {gameId} } },
          { new: true}
        );

        return removeGame;
      }
      throw AuthenticationError;
    }
  },
};

module.exports = resolvers;
