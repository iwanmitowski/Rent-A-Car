import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { getUser } from "../../services/auth-service";

export default function Header(props) {
  // Needed to refresh the header on login
  const isLogged = props.isLogged;

  const user = getUser();
  const mineCars = isLogged ? `/cars/mine/${user.id}` : "";
  const rentNewCars = isLogged ? `/cars/rent/${user.id}` : "";
  const editUser = isLogged ? `user/${user.id}` : "";

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
              {isLogged && (
                <Fragment>
                  <Link className="nav-link" to="/cars/all">
                    All cars
                  </Link>
                  <Link className="nav-link" to={rentNewCars}>
                    Rent new car
                  </Link>
                  <Link className="nav-link" to={mineCars}>
                    Mine cars
                  </Link>
                  <Link className="nav-link" to="/cars/create">
                    Create car
                  </Link>
                  <Link className="nav-link" to={editUser}>
                    {user.name}
                  </Link>
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </Fragment>
              )}
              {!isLogged && (
                <Fragment>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
