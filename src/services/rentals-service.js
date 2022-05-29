import axios from "axios";
import { globalConstants, rentConstants } from "../utils/constants";
import { editCar } from "./cars-service";
import { areValidDates } from "./days-service";
import { vipConditionCheck } from "./user-service";

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

  return axios.post(`${apiUrl}`, rent);
}

