const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

// getUserById query
// { userID : string }
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

// { userID : string }
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