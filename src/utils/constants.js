export const globalConstants = {
    API_URL: 'http://localhost:3005/',
}

export const authConstants = {
    INVALID_USERNAME_PASSWORD: "Invalid username/password",
    USER_ALREADY_REGISTERED: "User with this email already exists",
    PASSWORDS_DONT_MATCH: "Confirm password don't match password",
    MONEY_CANT_BE_NEGATIVE: "Money can't be negative number",
    FILL_REQUIRED_FIELDS: "Please fill required fields"
}

export const rentConstants = {
    START_DATE_CANT_BE_AFTER_END_DATE: "Start date can't be after end date",
    
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
