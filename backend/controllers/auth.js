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
    db.query('SELECT * FROM user WHERE userID = ?', [req.body['userID']],
    (error, result) => {
        if (!result) {
            return next();
        }
        // turn MySQL row into JSON
        result = result.map(v => Object.assign({}, v));
        req.body = { ...req.body, ...result[0] };
        return next();
    });
}

exports.getFollowerCount = async (req, res) => {
    db.query('SELECT SUM(userID) AS count FROM follow WHERE followID = ?', [req.body['userID']]),
    (error, result) => {
        if (error){
            console.log(error);
            res.status(400).send({error: error});
        }

        result = result.map(v => Object.assign({}, v));
        res.status(200).send({ result: result[0] });
    }
}

exports.getFollowingCount = async (req, res) => {
    db.query('SELECT SUM(userID) AS count FROM follow WHERE userID = ?', [req.body['userID']]),
    (error, result) => {
        if (error){
            console.log(error);
            res.status(400).send({error: error});
        }

        result = result.map(v => Object.assign({}, v));
        res.status(200).send({ result: result[0] });
    }
}