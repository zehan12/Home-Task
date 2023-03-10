const express = require("express");
const { createUser, loginUser } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");
const router = express();

router.get("/", verifyToken, (req, res) => { res.end("user page") })

router.post("/",createUser)

router.post("/login", loginUser)

module.exports = router;