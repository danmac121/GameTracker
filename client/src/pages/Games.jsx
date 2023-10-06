import Auth from "../utils/auth";
import { Link } from 'react-router-dom';
import { useState } from 'react';
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


const Games = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || { savedGames: [] }

  //filter userData array based on status in database
  const inProgressGames = userData.savedGames.filter(game => game.gameplayStatus === 'in progress')
  const nextUpGames = userData.savedGames.filter(game => game.gameplayStatus === 'next up')
  const completedGames = userData.savedGames.filter(game => game.gameplayStatus === 'completed')

  const [updateStatus, {error}] = useMutation(UPDATE_STATUS)

console.log(userData)

  function handleClick (event, gameId, gameplayStatus) {
    console.log(event.target, gameId, gameplayStatus)
  }

  const handleComplete = async (event, gameId) => {
    console.log(event.target, gameId )
    const {data} = await updateStatus({
      variables: {gameId, newStatus: 'completed'},
      refetchQueries: [GET_ME]
    })
  }

  const handleInProgress = async (event, gameId) => {
    console.log(event.target, gameId )
    const {data} = await updateStatus({
      variables: {gameId, newStatus: 'in progress'},
      refetchQueries: [GET_ME]
    })
  }

  const handleNextUp = async (event, gameId) => {
    console.log(event.target, gameId )
    const {data} = await updateStatus({
      variables: {gameId, newStatus: 'next up'},
      refetchQueries: [GET_ME]
    })
  }



  return (

    <>
      <h1 className="bg-dark p-3 text-light text-center">My Games</h1>
      <Container className="mb-5 mt-3">
        <Row>

          <Col md="4" className="p-3">
            <h2 className="bg-dark text-light text-center">In progress</h2>
            <ul className="list-group list-group-flush">
              {inProgressGames.map((game) => {
                return (
                  <>
                 <li key={game._id} className="list-group-item">
                      <Link to={`/single/${game._id}`}>{game.name}</Link>
                 </li>
                  <button onClick={()=> handleComplete(event, game.gameId)}>Complete</button>
                  <button onClick={()=> handleNextUp(event, game.gameId)}>Next Up</button>
                  </>
                )
              })}
            </ul>
          </Col>

          <Col md="4" className="p-3">
            <h2 className="bg-dark text-light text-center">Next Up</h2>
            <ul className="list-group list-group-flush">
              {nextUpGames.map((game) => {
                return (
                  <>
                  <li className="list-group-item">{game.name}</li>
                  <button onClick={()=> handleComplete(event, game.gameId)}>Complete</button>
                  <button onClick={()=> handleInProgress(event, game.gameId)}>In progress</button>
                  </>
                )
              })}

            </ul>
          </Col>


          <Col md="4" className="p-3">
            <h2 className="bg-dark text-light text-center">Completed</h2>
            <ul className="list-group list-group-flush">
              {completedGames.map((game) => {
                return (
                  <>
                  <li className="list-group-item">{game.name}</li>
                  <button onClick={()=> handleInProgress(event, game.gameId)}>In Progress</button>
                  <button onClick={()=> handleNextUp(event, game.gameId)}>Next Up</button>
                  </>
                )
              })}
            </ul>
          </Col>
        </Row>
      </Container>

      <Container>
        <Col className="p-5">
          <h4 className="bg-dark text-light text-center">Upcoming</h4>
        </Col>
      </Container>
    </>

  )

}


export default Games