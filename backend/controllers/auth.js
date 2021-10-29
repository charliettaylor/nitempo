const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

// login query
// { email: string, password: string }
exports.login = (req, res) => {
    try{
        const { email, password } = req.body;
        if( !email || !password ){
            res.status(400).json({ message: "Please provide an email or password" });
        }

        db.query("SELECT * FROM user WHERE Email = ?", [email],
        async (error, result) => {
            if( !result || !(await bcrypt.compare(password, result[0].password)) ){
                res.status(400).json({ message: "Email or password is incorrect" });
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
                res.status(200).json({ message: 'Login success' });
            }
        });

    } catch (error) {
        console.log(error);
    }
}

// logout (no longer needed?)
exports.logout = (req, res) => {
    res.cookie('login', 'logout', {
        expires: new Date(Date.now() + 2),
        httpOnly: true
    });

    res.status(200).json({ message: '' });
}

// signup query
// {   username: string,
//     email: string,
//     password: string,
//     passwordConfirm: string }
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
            res.status(400).json({ message: "Email already in use" });
        }
        else if(password !== passwordConfirm){
            res.status(400).json({ message: "Passwords do not match" });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO user SET ?',
        { username: username, email: email, password: hashedPassword }, (error, result) => {
            if(error){
                console.log(error);
            } else {
                console.log(result);
                res.status(200).json({ message: 'User account created!' });
            }
        });
    });
}

// getUserById query
// { userID : int }
exports.getUserById = (req, res) => {
    try{
        console.log(req.body.userID);
        db.query('SELECT * FROM user WHERE userID = ?', [req.body.userID],
        (error, result) => {
            if (!result) {
                res.status(400).json({ message: 'No user with specified ID' });
            }
            //res.send({"message" : "worked"});
            res.status(200).send(result[0]);
        });
    } catch(error) {
        console.log(error);
    }
}

// { userID : int }
exports.getUserInfo = async (req, res, next) => {
    db.query('SELECT * FROM user WHERE userID = ?', [req.body.userID],
    (error, result) => {
        if (!result) {
            return next();
        }
        // turn MySQL row into JSON
        result = result.map(v => Object.assign({}, v));
        console.log(result[0]);
        req.body = result[0];
        return next();
    });
}