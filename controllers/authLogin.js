const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
    console.log(req.body);

    // destructuring in JS
    const {email, password} = req.body;
    db.query('SELECT email, password FROM user W HERE email = ? AND password = ?' [email], [bcrypt.hashSync(password,8)],
    async (error, result) =>{
        if (error){
            console.log(error);
        }
        //string > number 
        if(result > 0){
            console.log("Successfully logged in");
            return res.send(email,hashPassword);
        }
    });
}