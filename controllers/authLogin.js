const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
    console.log(req.body);

    // destructuring in JS
    const { email, password} = req.body;

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

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        // signup
        db.query('INSERT INTO user SET ?', 
        { email: email, password: hashedPassword }, (error, result) =>{
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