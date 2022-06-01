import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCar,
  getAllCars,
  getCarById,
  getCarsForUser,
  getNonUserCars,
  getRentedCarsForUser,
} from "../../../services/cars-service";
import { returnCar } from "../../../services/rentals-service";
import { rentalStatus } from "../../../utils/constants";
import { CarCard } from "../car-card/CarCard";
import "./CarsList.css";

export function CarsList(props) {
  const [cars, setCars] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const areMine = props.areMine;
  const isDetails = props.isDetails;
  const areRented = props.areRented;

  useEffect(() => {
    if (isDetails) {
      getCarById(params.id)
        .then((res) => {
          setCars(res.data);
        })
        .catch();

      return;
    } else if (params.id && areRented) {
      getRentedCarsForUser(params.id, rentalStatus.IN_USE)
        .then((res) => {
          setCars(res);
        })
        .catch();

      return;
    } else if (params.id && areMine) {
      getCarsForUser(params.id)
        .then((res) => {
          setCars(res.data);
        })
        .catch();

      return;
    } else if (params.id && !areMine) {
      getNonUserCars(params.id)
        .then((res) => {
          setCars(res);
        })
        .catch();
      return;
    }

    getAllCars()
      .then((res) => {
        setCars(res);
      })
      .catch();
  }, [params.id, areMine, areRented, isDetails]);

  const deleteCarById = async (id) => {
    await deleteCar(id);
    setCars((prevState) => {
      return prevState.filter((car) => car.id !== id);
    });
  };

  const returnCurrentCar = async (rentId) => {
    await returnCar(rentId);
    getRentedCarsForUser(params.id, rentalStatus.IN_USE)
      .then((res) => {
        setCars(res);
      })
      .catch();
  };

  const toAllCars = () => {
    navigate("/cars/all");
  };

  if (cars.length === 0) {
    return (
      <div className="text-center">
        <h1>There are no cars</h1>
        <Button variant="primary" onClick={toAllCars}>
          Explore now
        </Button>
      </div>
    );
  }

  return (
    <div className="cars-list-wrapper">
      {cars.map((car) => {
        return (
          <CarCard
            key={car.rentalId || car.id}
            car={car}
            deleteCar={deleteCarById}
            returnCar={returnCurrentCar}
          />
        );
      })}
    </div>
  );
}
