import axios from "axios";
import { globalConstants } from "../utils/constants";

const apiUrl = globalConstants.API_URL + "cars";

export async function getCarById(id) {
    return axios.get(`${apiUrl}?id=${id}`);
}

export function getCarsForUser(userId) {
    return axios.get(`${apiUrl}?ownerId=${userId}`)
}

export async function getAllCars() {
    return axios.get(apiUrl);
}

export async function getNonUserCars(userId) {
    let cars = (await getAllCars()).data;
    cars = cars.filter(car => car.ownerId !== userId);
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

export async function deleteCar(id)  {
    return axios.delete(`${apiUrl}/${id}`);
}