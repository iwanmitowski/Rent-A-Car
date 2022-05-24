import axios from "axios";
import { globalConstants } from "../utils/constants";

const apiUrl = globalConstants.API_URL + 'users';

export function createUser(user) {
    if (!user.imageUrl) {
        user.imageUrl = ` https://picsum.photos/200/300?random=${Math.random()}`;
    }

    return axios.post(`${apiUrl}`, user);
}

export function editUser(user) {
    if (!user.imageUrl) {
        user.imageUrl = ` https://picsum.photos/200/300?random=${Math.random()}`;
    }

    return axios.put(`${apiUrl}/${user.id}`, user);
}