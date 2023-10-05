import Auth from "../utils/auth";
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";


const Games = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || { savedGames: [] }

  console.log(userData.savedGames)
  //filter userData array based on status in database
  const inProgressGames = userData.savedGames.filter(game => game.gameplayStatus === 'In progress')
  const nextUpGames = userData.savedGames.filter(game => game.gameplayStatus === 'next up')
  const completedGames = userData.savedGames.filter(game => game.gameplayStatus === 'completed')


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
                  <li className="list-group-item">{game.name}</li>
                )
              })}
            </ul>
          </Col>

          <Col md="4" className="p-3">
            <h2 className="bg-dark text-light text-center">Next Up</h2>
            <ul className="list-group list-group-flush">
              {nextUpGames.map((game) => {
                return (
                  <li className="list-group-item">{game.name}</li>
                )
              })}

            </ul>
          </Col>


          <Col md="4" className="p-3">
            <h2 className="bg-dark text-light text-center">Completed</h2>
            <ul className="list-group list-group-flush">
              {completedGames.map((game) => {
                return (
                  <li className="list-group-item">{game.name}</li>
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