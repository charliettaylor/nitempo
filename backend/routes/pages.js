const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const apiController = require("../controllers/api");

router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('home', {
        user: req.user
    });
});

router.get('/signup', authController.isLoggedIn, (req, res) => {
    if ( req.user ){
        res.redirect('/profile');
    } else {
        res.render('signup');
    }
});

router.get('/login', authController.isLoggedIn, (req, res) => {
    // redirects to profile if already signed in
    if ( req.user ){
        res.redirect('/profile');
    } else {
        res.render('login');
    }
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