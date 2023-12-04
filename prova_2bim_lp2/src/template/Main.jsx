import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

    export default function Main(props) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link title="Cad Usuario" id="basic-nav-dropdown" as={Link} to="/usuario">Cad. Usuario</Nav.Link>
                <Nav.Link title="Bate Papo" id="basic-nav-dropdown" as={Link} to="/batepapo">Bate Papo</Nav.Link>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
    );
}