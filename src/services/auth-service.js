import axios from "axios";
import { authConstants, globalConstants } from "../utils/constants";
import { createUser, vipConditionCheck } from "./user-service";

const apiUrl = globalConstants.API_URL + "users";

export async function registerUser(user) {
  if (
    !user.email ||
    !user.name ||
    !user.phone ||
    !user.password ||
    !user.confirmPassword
  ) {
    throw new Error(authConstants.FILL_REQUIRED_FIELDS);
  }

  if (user.password !== user.confirmPassword) {
    throw new Error(authConstants.PASSWORDS_DONT_MATCH);
  }

  if (user.money < 0) {
    throw new Error(authConstants.MONEY_CANT_BE_NEGATIVE);
  }

  const existingUser = (await axios.get(`${apiUrl}?email=${user.email}`)).data;

  if (existingUser.length) {
    throw new Error(authConstants.USER_ALREADY_REGISTERED);
  }

  Reflect.deleteProperty(user, "confirmPassword");

  const response = await createUser(user);
  const registeredUser = response.data;

  Reflect.deleteProperty(registeredUser, "password");

  setUser(registeredUser);

  return registeredUser;
}

export async function loginUser(user) {
  if (!user.email || !user.password) {
    throw new Error(authConstants.FILL_REQUIRED_FIELDS);
  }

  const existingUser = (
    await axios.get(`${apiUrl}?email=${user.email}&password=${user.password}`)
  ).data[0];

  if (!existingUser) {
    throw new Error(authConstants.INVALID_USERNAME_PASSWORD);
  }
  if (!existingUser.isActive) {
    throw new Error(authConstants.YOU_ARE_BANNED);
  }

  Reflect.deleteProperty(existingUser, "password");

  await vipConditionCheck(existingUser);
  setUser(existingUser);

  return existingUser[0];
}

export function getUser() {
  return JSON.parse(localStorage.getItem("loggedUser"));
}

export function isAdmin() {
  return getUser().isAdmin;
}

export function logout() {
  localStorage.removeItem("loggedUser");
}

function setUser(user) {
  localStorage.setItem("loggedUser", JSON.stringify(user));
}
