const express = require("express");
const apiController = require("../controllers/api");
const router = express.Router();

router.get('/getMe', apiController.getMe);

router.get('/getPlaylists', apiController.getUserPlaylists);

module.exports = router;