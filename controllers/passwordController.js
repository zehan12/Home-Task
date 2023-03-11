const User = require("../models/User")
const { status, errorMessage, successMessage } = require("../helpers/status");
const { isEmpty, isValidEmail, validatePassword } = require("../helpers/validations");

forgotPassword = async (req, res, next) => {
    let {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    } = req.body;


    if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
        errorMessage.error = 'Firstname, lastname, email, password and confirm-password field can not to empty'
        return res.status(status.bad).json(errorMessage);
    }

    if (password !== confirmPassword) {
        errorMessage.error = 'Passwords are not same';
        return res.status(status.bad).json(errorMessage);
    }

    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid email';
        return res.status(status.bad).json(errorMessage);
    }
    if (!validatePassword(password) || !validatePassword(confirmPassword)) {
        errorMessage.error = 'Password must be more than five(5) characters';
        return res.status(status.bad).json(errorMessage);
    }


    try {
        const userIsThere = await User.findOne({ email });
        if (!userIsThere) {
            errorMessage.error = `The email address ${email} is not associated with any account. Double-check your email address and try again.`;
            return res.status(status.bad).json(errorMessage);
        } else {

            if (userIsThere.firstName === firstName && userIsThere.lastName === lastName && userIsThere.email === email) {

                const oldPassword = await userIsThere.verifyPassword(password)
                console.log("matched",oldPassword)
                if ( oldPassword ) {
                    errorMessage.error = 'Password you enter matched with old password enter a new password';
                    return res.status(status.bad).json(errorMessage);
                } else {
                    userIsThere.password = password;
                    await  userIsThere.save();
                    let token = await userIsThere.signToken();
                    successMessage.user = userIsThere.userJSON(token);
                    return res.status(status.success).json(successMessage);
                }
            } else {
                errorMessage.error = "Details are not matching with DB";
                return res.status(status.unauthorized).json(errorMessage);
            }
        }

    } catch (error) {
        console.log(error);
        errorMessage.error = `Operation was not successful due to ${error.message}`;
        return res.status(status.error).json(errorMessage);
    }
}


module.exports = {
    forgotPassword
}