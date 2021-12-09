const express = require("express");
const authController = require("../controllers/auth");
const apiController = require("../controllers/spotifyApi");
const router = express.Router();

router.post('/getUserById', authController.getUserById);

router.post('/spotifyLogin', apiController.login);

router.post('/callback', apiController.callback);

router.post('/followerCount', authController.getFollowerCount);

router.post('/followingCount', authController.getFollowingCount);

module.exports = router;