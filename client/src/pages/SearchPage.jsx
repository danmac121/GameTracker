import { useState, useEffect, useRef } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth.js';
import {SEARCH_GAMES} from '../utils/queries';
import {useLazyQuery} from '@apollo/client';

function SearchGames() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchGames, {data}] = useLazyQuery(SEARCH_GAMES);
    const inputRef = useRef(null);
      useEffect(() => {
        if (data && data.searchGames) {
          setResults(data.searchGames);
        }
      }, [data]);
      
  const handleSearch = async () => {
    try {
      const inputValue = inputRef.current.value;
      setQuery(inputValue);
      searchGames({variables: {query: inputValue}});
  
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
          ref={inputRef}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a game..."
          
        />
        <button onClick={handleSearch}>Search</button>

      </div>
      <div>
        {results.map((game) => {
          for (let i = 0; i < results.length; i++) {
            return (
              <Col md="4" key={game.id}>
                <Card border='dark'>
                  
                 
                    <Card.Img src={game.image} alt={`The cover for ${game.name}`} variant='top' />
                  
                  <Card.Body>
                    <Card.Title>{game.name}</Card.Title>
                    
                    <Card.Text>{game.deck} </Card.Text>
                    <Card.Text> Platforms: {game.platforms.map(platform => platform.name).join(', ')}</Card.Text>
                    <Card.Text>Released: {game.releaseDate} </Card.Text>
                    
                    {/* {Auth.loggedIn() && (
                      <Button
                        disabled={savedGameIds?.some((savedGameId) => savedGameId === game.id)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveGame(game.id)}>
                        {savedGameIds?.some((savedGameId) => savedGameId === game.id)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )} */}
                  </Card.Body>
                </Card>
              </Col>
            );
            
          }
          
        })}
      </div>
    </div>

    
  );
}


export default SearchGames;
