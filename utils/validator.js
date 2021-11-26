import validator from "validator";

export const validateEmail = (email) => {
    if (validator.isEmail(email)) {
        return true;
    } else {
        return false;
    }
}