const express = require("express");
const authController = require("../controllers/auth");
const apiController = require("../controllers/api");
const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/spotifylogin', apiController.login);

module.exports = router;