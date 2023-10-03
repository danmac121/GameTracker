const typeDefs = `

type Auth {
  token: ID!
  user: User
}

type userTasks {
  user: User
  game: Game
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

  input GameInput {
    _id: ID
    gameId: Int
    title: String!
    description: String
    image: String
    genre: String
    gameplayStatus: String
    releaseDate: String
    platform: String
    completionTasks: [String]
  }

  type Game {
    _id: ID
    gameId: String!
    title: String!
    description: String
    image: String
    genre: String
    gameplayStatus: String
    releaseDate: String
    platform: String
    completionTasks: [String]!
  }



  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlatform(platform:String!): User
    savedGames(gameData: GameInput!): User
    addTask(gameId: String!, completionTasks: [String]!): userTasks
    removeGame(gameId: ID!): User

  }
`;

module.exports = typeDefs;
