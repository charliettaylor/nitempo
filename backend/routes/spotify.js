const express = require("express");
const apiController = require("../controllers/spotifyApi");
const authController = require('../controllers/auth');
const router = express.Router();

// getUserInfo middleware queries db for user data to set access token of spotify api
router.post('/getMe', authController.getUserInfo, apiController.getMe);

router.post('/getPlaylists', authController.getUserInfo, apiController.getUserPlaylists);

router.post('/refreshTokens', authController.getUserInfo, apiController.refreshUserTokens);

router.post('/search', authController.getUserInfo, apiController.search);

module.exports = router;