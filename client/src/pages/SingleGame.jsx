import Auth from "../utils/auth";
import Tasks from '../components/Tasks'
import {
    Container,
    Card,
    Button,
    Row,
    Col
  } from 'react-bootstrap';

const SingleGame = () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
  
    if (!token) {
      return false;
    }
  
    return (
      <>
      <h1 className="bg-dark p-3 text-light text-center">Single Game</h1>
        <Container className="mb-5 mt-3">
        <h2 className="bg-dark p-3 text-light text-center">Game Title</h2>
        <Col md="4" className="p-3">
        <h2 className="bg-dark text-light text-center">To-dos</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
        <Tasks />
        <Button>Add to-do</Button>
        <Button>Edit to-dos</Button>
        </Col>
        </Container>
      </>
  
    )
  
  }
  
  export default SingleGame