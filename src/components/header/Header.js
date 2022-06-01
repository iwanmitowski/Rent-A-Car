import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { getUser, logout } from "../../services/auth-service";

export default function Header(props) {
  // Needed to refresh the header on login
  const isLogged = props.isLogged;
  const setIsLogged = props.setIsLogged;

  const navigate = useNavigate();

  const user = getUser();
  const mineCars = isLogged ? `/cars/mine/${user.id}` : "";
  const rentNewCars = isLogged ? `/cars/rent/${user.id}` : "";
  const editUser = isLogged ? `/user/${user.id}` : "";
  const userRentals = isLogged ? `/user/rentals/${user.id}` : "";

  const loggingOut = (e) => {
    e.preventDefault();

    logout();
    setIsLogged(false);
    navigate("/");
  };

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
                  <NavDropdown title="Cars" id="collasible-nav-dropdown">
                    <NavDropdown.Item>
                      <Link className="nav-link" to={rentNewCars}>
                        Rent new car
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link className="nav-link" to={userRentals}>
                        My rentals
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link className="nav-link" to={mineCars}>
                        Mine cars
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Link className="nav-link" to="/cars/create">
                        Create car
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                  {user.isAdmin && (
                    <Link className="nav-link" to="/users">
                      Users management
                    </Link>
                  )}
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
          {isLogged && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Link className="nav-link" to={editUser}>
                  {user.name}
                </Link>
              </Navbar.Text>
              <Nav>
                <Link className="nav-link" to="/" onClick={loggingOut}>
                  Logout
                </Link>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </div>
  );
}
