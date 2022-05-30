import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { registerUser } from "../../../services/auth-service";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export function Register(props) {
  const setIsLogged = props.setIsLogged;

  const navigate = useNavigate();
  const [user, setUser] = useState({
    imageUrl: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isVip: false,
    money: 0,
    isActive: true,
    isAdmin: false,
  });

  const [error, setError] = useState("");

  const onInputChange = (e) => {
    setUser((prevState) => {
      let currentName = e.target.name;
      let currentValue = e.target.value;

      return {
        ...prevState,
        [currentName]: currentValue,
      };
    });

    setError("");
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    registerUser(user)
      .then(() => {
        setIsLogged(true);
        navigate("/cars/all");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="register-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        {error && <span className="text-danger">{error}</span>}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            placeholder="Enter Name"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter email"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="picture">
          <Form.Label>Picture</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={user.imageUrl}
            placeholder="Enter picture"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={user.phone}
            placeholder="Enter phone"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="money">
          <Form.Label>Money</Form.Label>
          <Form.Control
            type="number"
            name="money"
            value={user.money}
            placeholder="Enter money"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            placeholder="Enter password"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            placeholder="Confirm password"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <p>
            Already have account ?
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </p>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
