const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
    console.log(req.body);

    // destructuring in JS
    var {email, password} = req.body;
    db.query('SELECT email, password FROM user W HERE email = ? AND password = ?' [email], [password],
    async (error, result) =>{
        if (error){
            console.log(error);
        }
        //string > number
        if(result > 0){
            return res.send(result);
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        console.log(email, result);
    });
}