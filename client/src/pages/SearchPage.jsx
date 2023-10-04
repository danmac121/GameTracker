import { useState, useEffect } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth.js';
import {SEARCH_GAMES} from '../utils/queries';
import {useLazyQuery} from '@apollo/client';

function SearchGames() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchGames, {data}] = useLazyQuery(SEARCH_GAMES, {
      variables: { query },});
  const handleSearch = async () => {
    try {
      searchGames();
  
      console.log(data)
    
    }
    catch (err) {
      console.log("Failed to fetch games!", err);
    }
  }
console.log(data)
  return (
    <div>
      <div>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a game..."
          
        />
        <button onClick={handleSearch}>Search</button>

        <ul>
          {results.map(game => (
            <li key={game.id}>{game.name}</li>
          ))}
        </ul>
      </div>
      <div>
        {results.map((game) => {
          return (
            <Col md="4" key={game.id}>
              <Card border='dark'>
                {game.image ? (
                  <Card.Img src={game.image.medium_url} alt={`The cover for ${game.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  
                  <Card.Text>{game.deck} {game.platforms.name}</Card.Text>
                  
                  {/* {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === game.id)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(game.id)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === game.id)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )} */}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </div>
    </div>

    
  );
}


export default SearchGames;
