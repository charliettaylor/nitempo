// Setup
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');
var db = require('./controllers/db');
const cookieParser = require('cookie-parser');
const api = require('./controllers/spotifyApi');
const cors = require('cors');


const app = express();
const corsOptions = {
  origin: '*',
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['*'],
  credentials: true,
}
app.use(cors(corsOptions));

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

const unless = (path, middleware) => {
  return (req, res, next) => {
    if (req.path.includes(path)) {
        return next();
    } else {
        return middleware(req, res, next);
    }
  };
};

const bearerCheck = (req, res, next) => {
  // req : { forgot to send authorization header }
  // res : { send an Basic Auth request (HTTP Code: 403 Error }
  if(!req.headers.authorization) 
  { 
    console.log(req.originalUrl);
    return res.status(403).json({ error: 'No credentials sent!' });
  }

  // req : { sent invalid bearer token}
  // res : {send an Basic Auth request (HTTP Code: 401 Unauthorized} 
  if(req.headers.authorization.split(' ')[1] != process.env.BEARER_TOKEN)
  { return res.status(401).json({ error: '401 Unauthorized User' }); }

  // sent valid bearer token continue with processing
  next();
}

// Authenticator
app.use(unless('callback', bearerCheck));

// Define Routes
app.use('/auth', require('./routes/auth'));
app.use('/spotify', require('./routes/spotify'));
app.use('/post', require('./routes/post'));

// Error handling
app.use((req, res, next) => {
  const error = new Error('not found');

  return res.status(404).json({
      message: error.message
  });
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () =>
  console.log(
    `HTTP Server up. Now working on ${process.env.HEROKU_HOSTNAME} and port ${PORT}`
  )
);
