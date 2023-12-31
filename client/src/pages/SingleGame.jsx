import Auth from "../utils/auth";
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import Tasks from '../components/Tasks'
import { GET_ME } from '../utils/queries'
import Games from './Games.jsx'
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useState } from "react";
import Stream from "../components/Stream";
import "./SingleGame.css"

const SingleGame = () => {

  const { gameId } = useParams();
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || []

  const gameData = userData.savedGames || []

  //isolaties individual game by _id/parameter 
  const thisGameData = gameData.find((game) => game._id === gameId) 

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }


  if(loading){
return <>Loading...</>
  }

  return (
    <>
    <div >
      <h1 className="bg-dark p-3 text-light text-center  gameTitle">You're Playing: {thisGameData.name}</h1>
      <Container className="mb-5 mt-3">
        
        <div className="singleContainer">
       <div className="game">
          {/* <h2 className="bg-dark text-light text-center">To-dos</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
            <li className="list-group-item">Porta ac consectetur ac</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul> */}
          <Card.Img src={thisGameData.image} alt={`The cover for ${thisGameData.name}`} variant='top' />
          <Card.Text className="gameInfo" >{thisGameData.deck} </Card.Text>
          <Tasks />
          {/* <Button>Add to-do</Button>
          <Button>Edit to-dos</Button> */}
        </div>
        <div className="stream">
          
          <Stream></Stream>
          </div></div>
      </Container>
</div>
    </>

  )

}

export default SingleGame