const express = require("express");
const authController = require("../controllers/auth");
const postController = require("../controllers/post");
const router = express.Router();

router.post('/create', postController.create);

router.get('/get', postController.get);

module.exports = router;