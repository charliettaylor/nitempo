const express = require("express");
const authController1 = require("../controllers/authSignup")
const authController2 = require("../controllers/authLogin")
const router = express.Router();

router.post('/signup', authController1.signup);

router.post('/login', authController2.login);
module.exports = router;