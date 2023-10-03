import Auth from "../utils/auth";
import {
    Container,
    Card,
    Button,
    Row,
    Col
} from 'react-bootstrap';

const Profile = () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    return (
        <>
            <h1 className="bg-dark p-3 text-light text-center">My Profile</h1>
            <Container className="mt-3">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </Container>
        </>

    )

}



export default Profile