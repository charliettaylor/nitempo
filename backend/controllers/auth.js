const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

// getUserById query
// { userID : string }
exports.getUserById = (req, res) => {
    try{
        db.query('SELECT * FROM user WHERE userID = ?', [req.body["userID"]],
        (error, result) => {
            if (!result) {
                res.status(400).json({ message: 'No user with specified ID' });
            }
            
            res.status(200).json({result: result[0]});
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

exports.follow = async (req, res) => {
    db.query('INSERT INTO follow VALUES (?)', [[req.body['followID'], req.body['userID']]], [req.body['userID']]),
    (error, result) => {
        if (error){
            console.log(error);
            res.status(400).send({error: error});
        }

        result = result.map(v => Object.assign({}, v));
        res.status(200).send({ result: result[0] });
    }
}

exports.unfollow = async (req, res) => {
    db.query('DELETE FROM follow WHERE userID = ? AND followID = ?', [req.body['userID'], req.body['followID']], [req.body['userID']]),
    (error, result) => {
        if (error){
            console.log(error);
            res.status(400).send({error: error});
        }

        result = result.map(v => Object.assign({}, v));
        res.status(200).send({ result: result[0] });
    }
}