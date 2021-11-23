// Setup
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');
var db = require('./controllers/db');
const cookieParser = require('cookie-parser');
const api = require('./controllers/spotifyApi');


const app = express();

const publicDirectory = path.join(__dirname, '../frontend/public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../frontend/src/views'));
app.set('public', path.join(__dirname, '../frontend/public'));

// Define Routes
app.use('/auth', require('./routes/auth'));
app.use('/spotify', require('./routes/spotify'));
app.use('/post', require('./routes/post'));

//app.listen(5000, () => {
   // console.log('Server started on port 5000');
//});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () =>
  console.log(
    `HTTP Server up. Now working on ${process.env.HEROKU_HOSTNAME}`
  )
);
