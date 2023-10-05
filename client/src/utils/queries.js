import {gql} from '@apollo/client'

export const GET_ME = gql`
   query Me {
  me {
    username
    savedGames {
      _id
      gameId
      name
      deck
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
`;

