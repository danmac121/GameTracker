import {gql} from '@apollo/client'

export const GET_ME = gql`
    {
  me {
    _id
    username
    email
    gameCount
    platforms
    savedGames {
      _id
      gameId
      description
      title
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