var mysql = require('mysql');
var dotenv = require('dotenv');
dotenv.config({ path: './.env'});

// keep settings in local so everyone can setup their stuff indpendently
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
});

db.connect( (error) => {
    if(error){
        console.log(error);
    } else {
        console.log("MySQL connected!");
    }
});

module.exports = db;