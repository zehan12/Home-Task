const User = require("../models/User");
let { errorMessage, successMessage, status } = require('../helpers/status');
let { isEmpty, validatePassword, isValidEmail } = require("../helpers/validations")

createUser = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (isEmpty(email) || isEmpty(firstName) || isEmpty(lastName) || isEmpty(password)) {
        errorMessage.error = 'Firstname, lastname, email and password field cannot be empty';
        return res.status(status.bad).json(errorMessage);
    }
    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).json(errorMessage);
    }
    if (!validatePassword(password)) {
        errorMessage.error = 'Password must be more than five(5) characters';
        return res.status(status.bad).json(errorMessage);
    }
    try {
        const userExit = await User.findOne({ email });
        console.log(userExit);
        if (userExit) {
            errorMessage.error = `User with this ${email} already exist`;
            return res.status(status.conflict).json(errorMessage)
        } else {
            const user = await User.create({ firstName, lastName, email, password })
            let token = await user.signToken();
            successMessage.user = user.userJSON(token);
            return res.status(status.success).json(successMessage);
        }

    } catch (err) {
        errorMessage.error = `Operation was not successful due to ${err.message}`;
        return res.status(status.error).json(errorMessage);
    }
}

loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (isEmpty(email) || isEmpty(password)) {
        errorMessage.error = 'Email/Password required';
        return res.status(status.bad).json(errorMessage)
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            errorMessage.error = "User with this email does not exist"
            return res.status(status.notfound).json(errorMessage)
        }

        const result = await user.verifyPassword(password);
        if (!result) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).json(errorMessage);
        }
        let token = await user.signToken();
        successMessage.user = user.userJSON(token);
        return res.status(status.success).json(successMessage);
    } catch (err) {
        console.log(err)
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).json(errorMessage);
    }
}

module.exports = {
    createUser,
    loginUser
    
}