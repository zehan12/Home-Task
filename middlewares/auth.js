const jwt = require("jsonwebtoken");
const { status, errorMessage } = require("../helpers/status");

verifyToken = async (req, res, next) => {
    console.log(req.headers.authorization);
    let token = req.headers.authorization;
    if (!token) {
        errorMessage.error = 'Authentication Failed : Token not provided';
        return res.status(status.bad).send(errorMessage);
    }
    try {
        if (token) {
            const payload = await jwt.verify(token, process.env.SECRET);
            req.user = payload;
            next();
        } else {
            errorMessage.error = "Token required"
            return res.status(status.bad).json(errorMessage);
        }
    } catch (error) {
        console.log(error.message, "error");
        errorMessage.error = "Authentication Failed : " + error.message;
        return res.status(status.unauthorized).json(errorMessage);
    }

}

module.exports = {
    verifyToken
}