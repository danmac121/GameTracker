const typeDefs = `

type Auth {
  token: ID!
  user: User
}


enum GameplayStatus {
  IN_QUE
  CURRENTLY_PLAYING
  CURRENTLY_COMPLETING
  COMPLETED
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
    name: String!
    deck: String
    image: String
   
    gameplayStatus: String
    releaseDate: String
    platform: String
    completionTasks: [String]
  }

  type Game {
    _id: ID
    gameId: Int
    name: String
    deck: String
    image: String
    gameplayStatus: String
    releaseDate: String
    platforms: [Platforms]!
    completionTasks: [String]
  }
  type Platforms {
    name: String!
  }
  type Query {
    searchGames(query: String!): [Game]
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlatform(platform:String!): User
    savedGames(gameData: GameInput!): User
    addTask(gameId: Int!, completionTasks: [String]): User
    removeGame(gameId: ID!): User

  }
`;

module.exports = typeDefs;
