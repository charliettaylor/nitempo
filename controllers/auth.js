const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');


exports.login = (req, res) => {
    try{
        console.log(req.body);
        const { email, password } = req.body;
        if( !email || !password ){
            return res.status(400).render('login', {
                message: "Please provide an email or password"
            });
        }

        db.query("SELECT * FROM user WHERE Email = ?", [email],
        async (error, result) => {
            if( !result || !(await bcrypt.compare(password, result[0].password)) ){
                res.status(401).render('login', {
                    message: 'Email or Password is incorrect'
                });
            } else {
                const id = result[0].userID;
                // id same as "id: id"
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);

                const cookieOptions = {
                    expiresIn : new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                };

                res.cookie('login', token, cookieOptions);
                res.status(200).redirect("/");
            }
        });

    } catch (error) {
        console.log(error);
    }
}

exports.logout = (req, res) => {
    res.cookie('login', 'logout', {
        expires: new Date(Date.now() + 2),
        httpOnly: true
    });

    res.status(200).redirect('/');
}

exports.signup = (req, res) => {
    console.log(req.body);

    // destructuring in JS
    const { username, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM user WHERE email = ?', [email], 
    async (error, result) =>{
        if (error){
            console.log(error);
        }
        
        if(result > 0){
            return res.render('signup', {
                message: 'Email already in use'
            });
        }
        else if(password !== passwordConfirm){
            return res.render('signup', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO user SET ?', 
        { username: username, email: email, password: hashedPassword }, (error, result) =>{
            if(error){
                console.log(error);
            } else {
                console.log(result);
                return res.render('signup', {
                    message: 'User acount created!'
                });
            }
        });
    });
}

exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies);
    if ( req.cookies.login ){
        try {
            //1) verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.login, process.env.JWT_SECRET);
        
            //2) Check if the user still exists
            db.query('SELECT * FROM user WHERE userID = ?', [decoded.id],
            (error, result) => {
                if (!result) {
                    return next();
                }
                req.user = result[0];
                return next();
            });
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        next();
    }
}