const express = require("express");
const authController = require("../controllers/auth");
const postController = require("../controllers/post");
const router = express.Router();

router.post('/create', postController.create);

router.post('/get', postController.get);

router.post('/getUser', postController.getUser);

router.patch('/update', postController.update);

router.delete('/delete', postController.delete);

router.post('/feed', postController.getFeed);

module.exports = router;