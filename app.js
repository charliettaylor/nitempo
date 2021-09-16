// Setup
const express = require('express');
const path = require('path');
var db = require('./db');

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies
app.use(express.json());

app.set('view engine', 'hbs');

// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log('Server started on port 5000');
});