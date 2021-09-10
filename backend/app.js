// Setup
const express = require("express");
const mysql = require("mysql");
const fs = require('fs');
const app = express();

const settings = require('./local-settings.json');

// keep settings in local so everyone can setup their stuff indpendently
const db = mysql.createConnection({
    host: settings.host,
    port: settings.port,
    database: settings.database,
    user: settings.user,
    password: settings.password
});

db.connect( (error) => {
    if(error){
        console.log(error);
    } else {
        console.log("MySQL connected!")
    }
});

// Access
app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});