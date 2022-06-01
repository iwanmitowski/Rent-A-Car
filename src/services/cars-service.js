import axios from "axios";
import { globalConstants } from "../utils/constants";
import { stringToDate, today } from "./days-service";
import { getUserRentals } from "./rentals-service";

const apiUrl = globalConstants.API_URL + "cars";

export async function getCarById(id) {
  return axios.get(`${apiUrl}?id=${id}`);
}

export function getCarsForUser(userId) {
  return axios.get(`${apiUrl}?ownerId=${userId}`);
}

export async function getAllCars(isRent) {
  let cars = (await axios.get(apiUrl)).data;

  if (!isRent) {
    cars = cars.filter((c) => c.count > 0 && c.isActive);
  }

  return cars;
}

export async function getNonUserCars(userId) {
  let cars = await getAllCars();
  cars = cars.filter((car) => car.ownerId !== userId);
  return cars;
}

export function createCar(car) {
  // To-Do data manipulations
  return axios.post(apiUrl, car);
}

export function editCar(car) {
  // To-Do data manipulations
  return axios.put(`${apiUrl}/${car.id}`, car);
}

export async function deleteCar(id) {
  return axios.delete(`${apiUrl}/${id}`);
}

export async function getRentedCarsForUser(id, status) {
  let cars = await getAllCars(true);
  let rentals = (await getUserRentals(id)).data;

  rentals = rentals.filter((r) => r.status === status);

  let currentlyRentedCars = [];

  rentals.forEach((rental) => {
    let currentCar = cars.find((c) => c.id === rental.carId);

    currentlyRentedCars.push({
      ...currentCar,
      rentalId: rental.id,
      rentalStartDate: rental.startDate,
      rentalEndDate: rental.endDate,
      rentalPrice: rental.totalCost,
      rentalOverDue:
        stringToDate(rental.endDate) <= stringToDate(today().toDateString()),
    });
  });

  currentlyRentedCars.sort((c1, c2) => {
    if ((c1.rentalOverDue === c2.rentalOverDue) === false) {
      return stringToDate(c1.rentalEndDate) - stringToDate(c2.rentalEndDate);
    }

    return 1;
  });

  return currentlyRentedCars;
}
