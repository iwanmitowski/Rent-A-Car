import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../services/auth-service";
import { getCarById } from "../../../services/cars-service";
import { createRent, getUserRentals } from "../../../services/rentals-service";
import { rentalStatus } from "../../../utils/constants";
import "./RentForm.css";

export function RentForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState({});
  const [user] = useState(getUser());
  const [rentals] = useState(getUserRentals(user.id));
  const [error, setError] = useState("");
  const [rent, setRent] = useState({
    userId: user.id,
    carId: "",
    startDate: "",
    endDate: "",
    status: rentalStatus.IN_USE,
    totalCost: 0,
  });

  useEffect(() => {
    // Id of the car
    if (!params.id) {
      return;
    }

    getCarById(params.id)
      .then((res) => {
        setCar(res.data[0]);
        setCar((prevState) => {
            return {
                ...prevState,
                carInfo: prevState.brand + ' - ' + prevState.model,
            }
        })
      })
      .catch((error) => setError(error.message));

    setRent((prevState) => {
      return {
        ...prevState,
        carId: car.id,
      };
    });
  }, [params.id]);

  const onInputChange = (e) => {
    setRent((prevState) => {
      let currentName = e.target.name;
      let currentValue = e.target.value;

      //ako ima start i end date i ako e end ili start date da prekalkulira totalPrice ako dnite sa valdini sushto
      // da se vzema predvid broqt dnite i dali userut e vip
      return {
        ...prevState,
        [currentName]: currentValue,
      };
    });

    setError('');
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    createRent(rent, rentals)
      .then((res) => {
        navigate(`/user/rentals/${user.id}`);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="car-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        {error && <span className="text-danger">{error}</span>}
        <Form.Group className="mb-3" controlId="carInfo">
          <Form.Label style={{fontWeight: 'bold'}}>You are going to rent</Form.Label>
          <Col sm="10">
            <Form.Control
              plaintext
              readOnly
              defaultValue={car.carInfo}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="constructionYear">
          <Form.Label style={{fontWeight: 'bold'}}>Construction year</Form.Label>
          <Col sm="10">
            <Form.Control
              plaintext
              readOnly
              defaultValue={car.constructionYear}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="fuelType">
          <Form.Label style={{fontWeight: 'bold'}}>Fuel Type</Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={car.fuelType} />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="seatsCount">
          <Form.Label style={{fontWeight: 'bold'}}>Seats</Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={car.seatsCount} />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="pricePerDay">
          <Form.Label style={{fontWeight: 'bold'}}>Price per day:</Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={car.pricePerDay} />
          </Col>
        </Form.Group>
        <Form.Group className="mb-3" controlId="startDate">
          <Form.Label style={{fontWeight: 'bold'}}>Start date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={rent.startDate}
            placeholder="Enter start date"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="endDate">
          <Form.Label style={{fontWeight: 'bold'}}>Start date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={rent.endDate}
            placeholder="Enter end date"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="totalCost">
          <Form.Label  style={{fontWeight: 'bold'}}>Total cost:</Form.Label>
          <Col sm="10">
            <Form.Control
              plaintext
              readOnly
              defaultValue="smetni razlikata na dnite po price per day"
            />
          </Col>
        </Form.Group>
        {car.count > 0 && (
          <Button variant="warning" type="submit">
            Rent
          </Button>
        )}
      </Form>
    </div>
  );
}
