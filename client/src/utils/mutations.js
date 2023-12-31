import {gql} from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
       username
      _id
    }
  }
}
`

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_PLATFORM = gql`
mutation AddPlatform($platform: String!) {
  addPlatform(platform: $platform) {
    _id
    username
    email
    password
    gameCount
    platforms
    savedGames {
      _id
      gameId
      name
      deck
      image
     
      gameplayStatus
      releaseDate
      platforms
      completionTasks
    }
  }
}
`
export const ADD_GAME = gql`
mutation SavedGames($gameData: GameInput!) {
  savedGames(gameData: $gameData) {
    _id
    username
    email
    password
    gameCount
    platforms
    savedGames {
      _id
      gameId
      name
      deck
      image
      gameplayStatus
      releaseDate
      platforms{
      name
    }
      completionTasks
    }
  }
}
`

export const REMOVE_GAME = gql`
mutation RemoveGame($gameId: ID!) {
  removeGame(gameId: $gameId) {
    _id
    username
    email
    password
    gameCount
    platforms
    savedGames {
      _id
      gameId
      name
      deck
      image
      genre
      gameplayStatus
      releaseDate
      platform
      completionTasks
    }
  }
}
`

export const ADD_TASK = gql`

mutation Mutation($gameId: Int!, $completionTasks: [String]) {
  addTask(gameId: $gameId, completionTasks: $completionTasks) {
    savedGames {
      gameId
      name
      deck
      completionTasks
      _id
      image
      gameplayStatus
      releaseDate
    }
  }
}
`

export const REMOVE_TASK = gql`

mutation Mutation($gameId: Int!, $taskCompleted: String!) {
  removeTask(gameId: $gameId, taskCompleted: $taskCompleted) {
    _id
    savedGames {
      completionTasks
      _id
      gameId
      deck
      name
    }
  }
}`

export const UPDATE_STATUS = gql`
mutation Mutation($gameId: Int!, $newStatus: String!) {
  updateStatus(gameId: $gameId, newStatus: $newStatus) {
    username
    savedGames {
      name
      gameplayStatus
    }
    gameCount
  }
}`