import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to="/">
              Rent a car
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/">
                Rent a car
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
