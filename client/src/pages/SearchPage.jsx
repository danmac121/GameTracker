import { useState, useEffect, useRef } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth.js';
import { SEARCH_GAMES } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_GAME } from '../utils/mutations';
import {GET_USER_SAVED_GAMES} from '../utils/queries';
// import shortPlatforms from '../utils/shortenPlatforms';
import './SearchPage.css'


function SearchGames() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchGames, { data }] = useLazyQuery(SEARCH_GAMES);
  const [savedGameIds, setSavedGameIds] = useState([]);
  const {data: userData} = useQuery(GET_USER_SAVED_GAMES);
  const inputRef = useRef(null);
  const [showGameSaved, setShowGameSaved] = useState(false);
  useEffect(() => {
    if (data && data.searchGames) {
      setResults(data.searchGames);
      console.log("userData", userData);
    }
  }, [data]);
  useEffect(() => {
    if (userData && userData.me) {
      setSavedGameIds(userData.me.savedGames.map(G => G.gameId));
    }
    console.log("savedGameIds", savedGameIds);
    console.log("userData", userData);

  }, [userData, results]);
  const [addGame] = useMutation(ADD_GAME);

  const handleSaveGame = async (gameId) => {
    console.log("gameId before .find", gameId);
    const gameToSave = results.find((game) => {
    if(gameId === game.gameId){

      return game
    }
    });

    // console.log("gameToSave", gameToSave);
    // console.log(results)
    if (gameToSave) {
      //platforms come back as an array of objects so we map over it and return an array of strings
      const platformsFormatted = gameToSave.platforms.map(  p => ({ name: p.name }));      
     
     
      try {
        let gameAdded = await addGame({
          variables: {
            gameData: {
              name: gameToSave.name,
              gameId: gameToSave.gameId,
              image: gameToSave.image,
              deck: gameToSave.deck,
              platforms: platformsFormatted,
              releaseDate: gameToSave.releaseDate
            }
          }
        });
        setShowGameSaved(true);
        setSavedGameIds(game.gameId);
        console.log(userData.me.savedGames)
        setResults([...results]);
      } catch (err) {
        console.log("error saving game", err);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const inputValue = inputRef.current.value;
      setQuery(inputValue);
      searchGames({ variables: { query: inputValue } });

      console.log(data)

    }
    catch (err) {
      console.log("Failed to fetch games!", err);
    }
  }

  return (
    <div className="searchContainter">
      <div className='searchBar'>
        <h1 className="searchText">Search for your favorite games!</h1>
        <input
        className="actualBar"
          type="text"
          value={query}
          ref={inputRef}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a game..."

        />
        <button onClick={handleSearch}>Search</button>

      </div>
      <div className="searchContainer" >
      {console.log("savedGameIds",savedGameIds)}
        {results.map((game) => {
          // console.log("mapping game:", game.gameId)
          return (
            <Col key={game.gameId}>
              <Card  className="cards">
                

                <Card.Img className="image" src={game.image} alt={`The cover for ${game.name}` } variant='top' />
                <div>
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  
                  <Card.Text>{game.deck} </Card.Text>
                  <Card.Text className="platforms"> Platforms: {game.platforms.map(platform => platform.name).join(', ')}</Card.Text>
                  <Card.Text>Released: {game.releaseDate} </Card.Text>
                  {console.log("savedGameIds",savedGameIds)}
                  {Auth.loggedIn() && (
                    <Button
                    id='button'
                    className='button btn'
                    onClick={() => handleSaveGame(game.gameId)}
                    disabled={savedGameIds.includes(game.gameId)}
                    
                    >
                      Save this game!
                       
                    </Button>
                   
                  )} 
                    {console.log("savedGameIds",savedGameIds)}
                  {showGameSaved && savedGameIds === game.gameId && <span className="gameSavedSpan">Game Saved!</span>}
                </Card.Body>
                </div>
              </Card>
            </Col>
          );



        })}
      </div>
    </div>


  );
}


export default SearchGames;