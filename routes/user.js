const express = require("express");
const { createUser, loginUser } = require("../controllers/userController");
const router = express();

router.get("/", (req, res) => { res.end("user page") })

router.post("/",createUser)

router.post("/login", loginUser)

module.exports = router;