import Auth from "../utils/auth";
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';


const Games = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }

  return (
    <>
    <h1 className="bg-dark p-3 text-light text-center">My Games</h1>
      <Container className="mb-5 mt-3">
        <Row>
          <Col md="4" className="p-3">
            <h2 className="bg-dark text-light text-center">In progress</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </Col>

          <Col md="4" className="p-3">
            <h2 className="bg-dark text-light text-center">Next Up</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </Col>

          <Col md="4" className="p-3">
            <h2 className="bg-dark text-light text-center">Completed</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
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