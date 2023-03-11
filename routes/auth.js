const express = require("express");
const { forgotPassword } = require("../controllers/passwordController");
const router = express();

router.post('/forgot-password', forgotPassword)

// router.post('/recover', recover);

// router.get('/reset/:token', reset);

// router.post('/reset/:token', resetPassword);

module.exports = router;