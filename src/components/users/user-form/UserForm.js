import { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, isAdmin } from "../../../services/auth-service";
import { editUser, getUserById } from "../../../services/user-service";
import "./UserForm.css";

export function UserForm(props) {
  const params = useParams();
  const navigate = useNavigate();

  const isCurrentUserAdmin = isAdmin();
  const currentUserId = getUser().id;
  const isEdit = params.id === currentUserId;

  const [error, setError] = useState("");
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
  });

  useEffect(() => {
    if (!params.id) {
      navigate(`/users`);
    }

    getUserById(params.id).then((res) => {
      setUser(res.data[0]);
    });
  }, [params.id, isEdit, user.isActive, navigate]);

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

    editUser(user)
      .then(() => {
        setUser({ ...user, confirmPassword: "" });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const changeUserStatus = (e) => {
    e.preventDefault();

    user.isActive = !user.isActive;
    editUser(user, true).then((res) => {
      setUser(res.data);
    });
  };

  const backToUsers = () => navigate("/users");

  return (
    <div className="car-form-wrapper">
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
        {currentUserId === params.id && (
          <Fragment>
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
          </Fragment>
        )}
        {(isEdit || isCurrentUserAdmin) && (
          <Button variant="primary" type="submit">
            Edit
          </Button>
        )}
        {isCurrentUserAdmin && currentUserId !== params.id && (
          <Button variant="danger" onClick={changeUserStatus}>
            {user.isActive ? "Ban" : "Unban"} user
          </Button>
        )}
        {
          <Button variant="info" onClick={backToUsers}>
            Back To Users
          </Button>
        }
      </Form>
    </div>
  );
}
