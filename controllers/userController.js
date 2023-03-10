const User = require("../models/User");
createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password)
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    createUser
}