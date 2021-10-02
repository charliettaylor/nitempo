const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const apiController = require("../controllers/api");

router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.user
    });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
    // if user exists and is logged in, render profile and send user info
    if ( req.user ) {
        res.render('profile', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/callback', apiController.callback);

module.exports = router;