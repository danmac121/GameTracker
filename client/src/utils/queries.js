import { gql } from '@apollo/client';

export const QUERY_ME = gql`
 query me {
  me {
    _id
    bookCount
    savedBooks {
      _id
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;

export const SEARCH_GAMES = gql`
query searchGames($query: String!) {
  searchGames(query: $query) {
    id
    name
    deck
    image
    platforms {
      name
    }
  }
}
`;

