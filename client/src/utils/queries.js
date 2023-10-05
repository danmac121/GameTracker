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
      deck
      name
      image
      
      gameplayStatus
      releaseDate
    
      completionTasks
    }
  }
}
`;

export const SEARCH_GAMES = gql`
query searchGames($query: String!) {
  searchGames(query: $query) {
    gameId
    name
    deck
    image
    releaseDate 
    platforms {
      name
    }
  }
}
`
