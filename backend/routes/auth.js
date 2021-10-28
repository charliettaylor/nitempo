const express = require("express");
const authController = require("../controllers/auth");
const apiController = require("../controllers/spotifyApi");
const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/getUserById', authController.getUserById);

router.get('/spotifyLogin', apiController.login);

router.get('/callback', apiController.callback);

module.exports = router;