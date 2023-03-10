
//Email Check
const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

//Password Validation
const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } return true;
};

//Empty Check
const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
    return false;
};

module.exports = {
    isValidEmail,
    validatePassword,
    isEmpty
}