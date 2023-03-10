const express = require("express");
const { createUser } = require("../controllers/userController");
const router = express();

router.get("/", (req, res) => { res.end("user page") })

router.post("/",createUser)

module.exports = router;