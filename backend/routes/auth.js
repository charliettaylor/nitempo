const express = require("express");
const authController = require("../controllers/auth");
const apiController = require("../controllers/spotifyApi");
const router = express.Router();

router.get('/getUserById', authController.getUserById);

router.get('/spotifyLogin', apiController.login);

router.get('/callback', apiController.callback);

router.get('/followerCount', authController.getFollowerCount);

router.get('/followingCount', authController.getFollowingCount);

module.exports = router;