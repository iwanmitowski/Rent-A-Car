import axios from "axios";
import { globalConstants, rentConstants } from "../utils/constants";

const apiUrl = globalConstants.API_URL + "rentals";

export function getUserRentals(userId) {
    return axios.get(`${apiUrl}?userId=${userId}`);
}

export function createRent(rent, user, rentals) {
    var startDate = new Date(rent.startDate).getDate();
    var endDate = new Date(rent.endDate).getDate();

    if (startDate > endDate) {
        throw new Error(rentConstants.START_DATE_CANT_BE_AFTER_END_DATE);
    }

    //da proveri parite na usera,
    // 


    // da splitna metoda na chasti
    return axios.post(`${apiUrl}`, rent);
}
