const express = require("express");
const authController = require("../controllers/auth");
const apiController = require("../controllers/spotifyApi");
const router = express.Router();

router.get('/getUserById', authController.getUserById);

router.get('/spotifyLogin', apiController.login);

router.get('/callback', apiController.callback);

module.exports = router;