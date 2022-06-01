import axios from "axios";
import {
  globalConstants,
  rentalStatus,
  rentConstants,
} from "../utils/constants";
import { editCar, getCarById } from "./cars-service";
import { areValidDates } from "./days-service";
import { editUser, getUserById, vipConditionCheck } from "./user-service";

const apiUrl = globalConstants.API_URL + "rentals";

export async function getUserRentals(userId) {
  return axios.get(`${apiUrl}?userId=${userId}`);
}

export async function getAllRentals() {
  return axios.get(apiUrl);
}

export async function createRent(rent, user, car) {
  const validDates = areValidDates(rent.startDate, rent.endDate);

  if (!validDates) {
    throw new Error(rentConstants.START_DATE_CANT_BE_AFTER_END_DATE);
  }
  if (user.money < rent.totalCost) {
    throw new Error(rentConstants.NOT_ENOUGH_MONEY);
  }
  if (car.count === 0) {
    throw new Error(rentConstants.THE_CAR_IS_NOT_AVAILABLE);
  }

  user.money -= rent.totalCost;
  await vipConditionCheck(user);

  car.count--;
  await editCar(car);

  const carOwner = (await getUserById(car.ownerId)).data[0];
  carOwner.money += rent.totalCost;
  await editUser(carOwner, true);

  return axios.post(`${apiUrl}`, rent);
}

export async function editRent(rent) {
  return axios.patch(`${apiUrl}/${rent.id}`, rent);
}

export async function getRentById(id) {
  return axios.get(`${apiUrl}/${id}`);
}

export async function returnCar(rentId) {
  let rent = (await getRentById(rentId)).data;

  let car = (await getCarById(rent.carId)).data[0];
  car.count++;
  await editCar(car);

  rent.status = rentalStatus.RETURNED;
  await editRent(rent);

  return car.id;
}
