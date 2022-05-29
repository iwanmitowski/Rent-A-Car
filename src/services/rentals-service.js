import axios from "axios";
import { globalConstants, rentConstants } from "../utils/constants";
import { areValidDates } from "./days-service";

const apiUrl = globalConstants.API_URL + "rentals";

export function getUserRentals(userId) {
    return axios.get(`${apiUrl}?userId=${userId}`);
}

export function createRent(rent, user, rentals) {
    const validDates = areValidDates(rent.startDate, rent.endDate);

    if (!validDates) {
        throw new Error(rentConstants.START_DATE_CANT_BE_AFTER_END_DATE);
    }

    //da proveri parite na usera,
    // 


    // da splitna metoda na chasti
    return axios.post(`${apiUrl}`, rent);
}
