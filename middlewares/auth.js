const jwt = require("jsonwebtoken");
const { status, errorMessage } = require("../helpers/status");

verifyToken = async (req, res, next) => {
    console.log(req.headers.authorization);
    let token = req.headers.authorization;
    try {
        if (token) {
            const payload = await jwt.verify(token, process.env.SECRET);
            req.user = payload;
            next()
        } else {
            errorMessage.error = "Token required"
            return res.status(status.bad).json(errorMessage);
        }
    } catch (error) {
        console.log(error.message,"error");
        errorMessage.error = error.message
        return res.status(status.error).json(errorMessage);
    }

}

module.exports = {
    verifyToken
}