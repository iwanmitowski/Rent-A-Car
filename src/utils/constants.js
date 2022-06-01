export const globalConstants = {
    API_URL: 'http://localhost:3005/',
}

export const authConstants = {
    INVALID_USERNAME_PASSWORD: "Invalid username/password",
    USER_ALREADY_REGISTERED: "User with this email already exists",
    PASSWORDS_DONT_MATCH: "Confirm password don't match password",
    MONEY_CANT_BE_NEGATIVE: "Money can't be negative number",
    FILL_REQUIRED_FIELDS: "Please fill required fields",
    YOU_ARE_BANNED: "You are banned",
}

export const rentConstants = {
    START_DATE_CANT_BE_AFTER_END_DATE: "Start date can't be after end date",
    NOT_ENOUGH_MONEY: "You don't have enough money to rent that car",
    THE_CAR_IS_NOT_AVAILABLE: "No cars of that model in the garage",
    CONFIRM_TO_RETURN_CAR: "Are you sure you want to return ",
}

export const userConstants = {
    CONFIRM_TO_DELETE_USER: "Are you sure you want to delete ",
}

export const carTypes = {
    ECONOMY: "Economy",
    ESTATE: "Estate",
    LUXURY: "Luxury",
    SUV: "SUB",
}

export const fuelTypes = {
    PETROL: "Petrol", 
    DIESEL: "Diesel", 
    HYBRID: "Hybrid",
    ELECTRIC: "Electric",
}

export const rentalStatus = {
    RETURNED: "Returned",
    IN_USE: "In use",
}
