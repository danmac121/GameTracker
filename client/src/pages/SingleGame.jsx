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

const SingleGame = () => {

  const { gameId } = useParams();
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || []

  const gameData = userData.savedGames || []

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
      <h1 className="bg-dark p-3 text-light text-center">You're Playing: {thisGameData.name}</h1>
      <Container className="mb-5 mt-3">
        <h2 className="bg-dark p-3 text-light text-center"></h2>
        <Col md="4" className="p-3">
          {/* <h2 className="bg-dark text-light text-center">To-dos</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
            <li className="list-group-item">Porta ac consectetur ac</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul> */}
          <Card.Img src={thisGameData.image} alt={`The cover for ${thisGameData.name}`} variant='top' />
          <Card.Text>{thisGameData.deck} </Card.Text>
          <Tasks />
          {/* <Button>Add to-do</Button>
          <Button>Edit to-dos</Button> */}
        </Col>
      </Container>

    </>

  )

}

export default SingleGame