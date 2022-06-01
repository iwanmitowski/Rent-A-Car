import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../services/auth-service";
import { getCarById } from "../../../services/cars-service";
import { rentConstants } from "../../../utils/constants";
import "./CarCard.css";

export function CarCard(props) {
  const params = useParams();
  const user = getUser();

  const returnCar = props.returnCar;
  const deleteCar = props.deleteCar;
  let [car, setCar] = useState();
  let [isRented, setIsRented] = useState(false);

  useEffect(() => {
    if (props.isDetails) {
      getCarById(params.id).then((res) => {
        setCar(res.data);
      });
    } else {
      setCar(props.car);
      setIsRented(!!props.car.rentalId);
    }
  }, [params.id, props.car, props.isDetails]);

  const isCarOwner = car && user && user.id === car.ownerId;

  const navigate = useNavigate();

  const toEdit = () => {
    navigate(`/car/edit/${car.id}`);
  };

  const toRent = () => {
    navigate(`/rent/${car.id}`);
  };

  const returnCurrentCar = async () => {
    if (
      window.confirm(
        rentConstants.CONFIRM_TO_RETURN_CAR + car.brand + " - " + car.model
      )
    ) {
      await returnCar(car.rentalId);
    }
  };

  return (
    car && (
      <div className="task-card-wrapper">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={car.imageUrl} />
          <Card.Body>
            <Card.Title>
              {car.brand} - {car.model}
            </Card.Title>
            <Card.Text>
              <span className="key">Construction Year: </span>
              <span className="value">{car.constructionYear}</span>
            </Card.Text>
            <Card.Text>
              <span className="key">Type: </span>
              <span className="value">{car.type}</span>
            </Card.Text>
            <Card.Text>
              <span className="key">Fuel Type: </span>
              <span className="value">{car.fuelType}</span>
            </Card.Text>
            <Card.Text>
              <span className="key">Seats: </span>
              <span className="value">{car.seatsCount}</span>
            </Card.Text>
            {!isRented && (
              <Card.Text>
                <span className="key">Available count: </span>
                <span className="value">{car.count}</span>
              </Card.Text>
            )}
            {isRented && (
              <Card.Text>
                <span className="key">Rental start date: </span>
                <span className="value">{car.rentalStartDate}</span>
              </Card.Text>
            )}
            {isRented && (
              <Card.Text>
                <span className="key">Rental end date: </span>
                <span
                  className="value"
                  style={{ color: car.rentalOverDue ? "red" : "" }}
                >
                  {car.rentalEndDate}
                </span>
              </Card.Text>
            )}
            {isRented && (
              <Card.Text>
                <span className="key">Paid price: </span>
                <span className="value">{car.rentalPrice}</span>
              </Card.Text>
            )}
            <Card.Text>
              <span className="key">Price per day: </span>
              <span className="value">{car.pricePerDay}</span>
            </Card.Text>
            <div className="btn-holder">
              {isCarOwner && (
                <Button variant="primary" onClick={toEdit}>
                  Edit
                </Button>
              )}
              {isCarOwner && (
                <Button variant="danger" onClick={() => deleteCar(car.id)}>
                  Delete
                </Button>
              )}
              {!isCarOwner && !isRented && !!user && (
                <Button variant="warning" onClick={toRent}>
                  Rent
                </Button>
              )}
              {isRented && (
                <Button
                  variant={car.rentalOverDue ? "danger" : "warning"}
                  onClick={returnCurrentCar}
                >
                  Return
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  );
}
