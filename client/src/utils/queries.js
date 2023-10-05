import {gql} from '@apollo/client'

export const GET_ME = gql`
   query Me {
  me {
    username
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
<<<<<<< HEAD
`;

export const GET_USER_SAVED_GAMES = gql`
  query GetUserSavedGames {
   me {
      savedGames{
      gameId}
    }
  }
`;
=======
`
>>>>>>> ca40be3a8340badeea3ef3cb05f3c6d60993715c
