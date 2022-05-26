import axios from "axios";
import { authConstants, globalConstants } from "../utils/constants";

const apiUrl = globalConstants.API_URL + 'users';

export function createUser(user) {
    if (!user.imageUrl) {
        user.imageUrl = ` https://picsum.photos/200/300?random=${Math.random()}`;
    }

    return axios.post(`${apiUrl}`, user);
}

export async function editUser(user) {
    if (!user.password || !user.name) {
        throw new Error(authConstants.FILL_REQUIRED_FIELDS);
    }
    if (user.password !== user.confirmPassword) {
        throw new Error(authConstants.PASSWORDS_DONT_MATCH);
    }
    if (user.money < 0) {
        throw new Error(authConstants.MONEY_CANT_BE_NEGATIVE);
    }
    if (!user.imageUrl) {
        user.imageUrl = ` https://picsum.photos/200/300?random=${Math.random()}`;
    }

    Reflect.deleteProperty(user, "confirmPassword");
    
    return axios.put(`${apiUrl}/${user.id}`, user);
}

export async function getUserById(id) {
    return axios.get(`${apiUrl}?id=${id}`);
}

export async function deleteUser(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export function getAllUsers() {
    return axios.get(`${apiUrl}`);
}