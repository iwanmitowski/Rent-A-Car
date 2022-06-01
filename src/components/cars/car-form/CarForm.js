import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../services/auth-service";
import { createCar, editCar, getCarById } from "../../../services/cars-service";
import { carTypes, fuelTypes } from "../../../utils/constants";
import "./CarForm.css";

export function CarForm(props) {
  const params = useParams();
  const navigate = useNavigate();

  const isEdit = !!params.id;
  const user = getUser();

  const [error, setError] = useState("");
  const [car, setCar] = useState({
    isActive: false,
    imageUrl: "",
    brand: "",
    model: "",
    constructionYear: "",
    type: "",
    fuelType: "",
    seatsCount: 0,
    pricePerDay: 0,
    count: 0,
    ownerId: user.id,
  });

  useEffect(() => {
    if (!params.id) {
      return;
    }

    getCarById(params.id).then((res) => {
      setCar(res.data[0]);
    });
  }, [params.id, isEdit]);

  const onInputChange = (e) => {
    setCar((prevState) => {
      let currentName = e.target.name;
      let currentValue = e.target.value;

      if (currentName === "isActive") {
        currentValue = e.target.checked;
      }

      return {
        ...prevState,
        [currentName]: currentValue,
      };
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const event = isEdit ? editCar : createCar;

    event(car)
      .then((res) => {
        let carId = res.data.id;

        navigate(`/car/${carId}`);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="car-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        {error && <span className="text-danger">{error}</span>}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            value={car.brand}
            placeholder="Enter Brand"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            name="model"
            value={car.model}
            placeholder="Enter Model"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="constructionYear">
          <Form.Label>Construction Year</Form.Label>
          <Form.Control
            type="date"
            name="constructionYear"
            value={car.constructionYear}
            placeholder="Enter constructionYear"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Type</Form.Label>
          <Form.Select
            placeholder="Select Status"
            name="type"
            value={car.type}
            onChange={onInputChange}
          >
            {Object.keys(carTypes).map((type) => (
              <option key={type} value={carTypes[type]}>
                {carTypes[type]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Fuel Type</Form.Label>
          <Form.Select
            placeholder="Select Status"
            name="fuelType"
            value={car.fuelType}
            onChange={onInputChange}
          >
            {Object.keys(fuelTypes).map((type) => (
              <option key={type} value={fuelTypes[type]}>
                {fuelTypes[type]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="seatsCount">
          <Form.Label>Seats</Form.Label>
          <Form.Control
            type="number"
            name="seatsCount"
            value={car.seatsCount}
            placeholder="Enter seats count"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pricePerDay">
          <Form.Label>Price per day</Form.Label>
          <Form.Control
            type="number"
            name="pricePerDay"
            value={car.pricePerDay}
            placeholder="Enter price per day"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="count">
          <Form.Label>Car count</Form.Label>
          <Form.Control
            type="number"
            name="count"
            value={car.count}
            placeholder="Enter car count"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="isActive">
          <Form.Label>Do you want to rent out the car ?</Form.Label>
          <Form.Check
            type="checkbox"
            name="isActive"
            checked={car.isActive}
            label="Active"
            onChange={onInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isEdit ? "Edit" : "Create"}
        </Button>
      </Form>
    </div>
  );
}
