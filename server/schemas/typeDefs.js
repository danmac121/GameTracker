const typeDefs = `

type Auth {
  token: ID!
  user: User
}

type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    gameCount: Int
    platforms: [String]
    savedGames: [Game]
  }

  input PlatformsInput {
    name: String!
  }

  type Platforms {
    name: String!
  }

  input GameInput {
    _id: ID
    gameId: Int
    name: String!
    deck: String
    image: String
    gameplayStatus: String
    releaseDate: String
    platforms: [PlatformsInput]
    completionTasks: [String]
    accolades: [String]
  }

  type Game {
    _id: ID
    gameId: Int
    name: String
    deck: String
    image: String
    gameplayStatus: String
    releaseDate: String
    platforms: [Platforms]
    completionTasks: [String]
    accolades: [String]
  }

  type Query {
    searchGames(query: String!): [Game]
  }


  type Query {
    me: User
    getUserSavedGames: [Game]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlatform(platform:String!): User
    savedGames(gameData: GameInput!): User
    addTask(gameId: Int!, completionTasks: [String]): User
    removeTask(gameId: Int!, taskCompleted: String!): User
    removeGame(gameId: ID!): User
    updateStatus(gameId: Int!, newStatus: String!): User

  }
`;

module.exports = typeDefs;
