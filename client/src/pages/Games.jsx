import Auth from "../utils/auth";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { UPDATE_STATUS } from "../utils/mutations"; 
import formatDate from '../utils/dateFormat'
import './Games.css'


const Games = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || { savedGames: [] }

  
  //filter userData array based on status in database
  const inProgressGames = userData.savedGames.filter(game => game.gameplayStatus === 'in progress')
  const nextUpGames = userData.savedGames.filter(game => game.gameplayStatus === 'next up')
  const completedGames = userData.savedGames.filter(game => game.gameplayStatus === 'completed')

  const [updateStatus, {error}] = useMutation(UPDATE_STATUS)


  const handleComplete = async (event, gameId) => {
    const {data} = await updateStatus({
      variables: {gameId, newStatus: 'completed'},
      refetchQueries: [GET_ME]
    })
  }

  const handleInProgress = async (event, gameId) => {
    const {data} = await updateStatus({
      variables: {gameId, newStatus: 'in progress'},
      refetchQueries: [GET_ME]
    })
  }

  const handleNextUp = async (event, gameId) => {
    const {data} = await updateStatus({
      variables: {gameId, newStatus: 'next up'},
      refetchQueries: [GET_ME]
    })
  }



  return (

    <>
      <h1 className="header text-center">My Games</h1>
      <Container className="mb-5 mt-3 gameContainer">
        <Row>

          <Col sm="12" md="12" lg="4" className="p-3">
            <h2 className="header text-center">In progress</h2>
            <ul className="list-group list-group-flush">
              {inProgressGames.map((game) => {
                return (
                  <Col  key={game._id}>
                  <Card className="card" >
                    
                    
                    <Card.Img className="img" src={game.image} alt={`The cover for ${game.name}`} variant='top' />
    
                    <Card.Body>
                      <Card.Title className = "gameName"><Link className = "gameName" to={`/single/${game._id}`}>{game.name}</Link></Card.Title>
                     
                      <Card.Text>{game.deck} </Card.Text>
                      <Card.Text>Platforms: {game.platforms ? game.platforms.map(platform => platform.name).join(', ') : 'No platforms available'} </Card.Text>
                      <Card.Text>Released: {  formatDate(game.releaseDate)} </Card.Text>
                       
                  <button className="button" onClick={()=> handleComplete(event, game.gameId)}>Complete</button>
                  <button className="button" onClick={()=> handleNextUp(event, game.gameId)}>Next Up</button>
                     
                    </Card.Body>
                  </Card>
                </Col>
                  
             
                 
                )
              })}
            </ul>
          </Col>

          <Col sm="12" md="12" lg="4" className="p-3">
            <h2 className="header text-center">Next Up</h2>
            <ul className="list-group list-group-flush">
              {nextUpGames.map((game) => {
                return ( <Col  key={game._id}>
                <Card className="card" >
                  
                  
                  <Card.Img className="img" src={game.image} alt={`The cover for ${game.name}`} variant='top' />
  
                  <Card.Body>
                  <Card.Title className = "gameName"><Link className = "gameName" to={`/single/${game._id}`}>{game.name}</Link></Card.Title>
                   
                    <Card.Text>{game.deck} </Card.Text>
                    <Card.Text>Platforms: {game.platforms ? game.platforms.map(platform => platform.name).join(', ') : 'No platforms available'} </Card.Text>
                    <Card.Text>Released: { formatDate(game.releaseDate)} </Card.Text>
                     
                    
                  <button className="button" onClick={()=> handleComplete(event, game.gameId)}>Complete</button>
                  <button className="button" onClick={()=> handleInProgress(event, game.gameId)}>In progress</button>
                
                   
                  </Card.Body>
                </Card>
              </Col>
                 
                )
              })}

            </ul>
          </Col>


          <Col sm="12" md="12" lg="4" className="p-3">
            <h2 className="header text-center">Completed</h2>
            <ul className="list-group list-group-flush">
              {completedGames.map((game) => {
                
                return (
                  <Col  key={game._id}>
                  <Card className="card">
                    
                    
                    <Card.Img className="img" src={game.image} alt={`The cover for ${game.name}`} variant='top' />
    
                    <Card.Body>
                    <Card.Title className = "gameName"><Link className = "gameName" to={`/single/${game._id}`}>{game.name}</Link></Card.Title>
                     
                      <Card.Text>{game.deck} </Card.Text>
                      <Card.Text>Platforms: {game.platforms ? game.platforms.map(platform => platform.name).join(', ') : 'No platforms available'} </Card.Text>
                      <Card.Text>Released: { formatDate(game.releaseDate)} </Card.Text>
                       
                      
                  <button className="button" onClick={()=> handleInProgress(event, game.gameId)}>In Progress</button>
                  <button className="button" onClick={()=> handleNextUp(event, game.gameId)}>Next Up</button>
                  
                     
                    </Card.Body>
                  </Card>
                </Col>
                  
          
                )
              })}
            </ul>
          </Col>
        </Row>
      </Container>

      
    </>

  )

}


export default Games