import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../../services/auth-service";
import "./UserCard.css";

export default function UserCard(props) {
  const user = props.user;
  const isCurrentUserAdmin = isAdmin();
  const deleteUser = props.deleteUser;

  const navigate = useNavigate();

  const redirectToEdit = () => {
    navigate(`/user/${user.id}`);
  };

  if (!user) {
    return <p className="text-danger">No User!</p>;
  }

  return (
    <Card
      style={{ width: "18rem", border: user.isVip ? "5px solid #FFC107" : "" }}
    >
      <Card.Img
        variant="top"
        src={user.imageUrl}
        style={{ borderBottom: user.isVip ? "5px solid #FFC107" : "" }}
      />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
          <span className="key">Rentals: </span>
          <span className="value">{user.rentalsCount}</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Email: </span>
          <span className="value">{user.email}</span>
        </Card.Text>
        <Card.Text>
          <span className="key">Phone: </span>
          <span className="value">{user.phone}</span>
        </Card.Text>
        <div className="btn-holder">
          <Button variant="primary" onClick={redirectToEdit}>
            See details
          </Button>
          {isCurrentUserAdmin && (
            <Button variant="danger" onClick={() => deleteUser(user.id)}>
              Delete
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
