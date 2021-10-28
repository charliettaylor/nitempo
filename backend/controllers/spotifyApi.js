const SpotifyWebApi = require('spotify-web-api-node');
const db = require('./db');
const express = require('express');
const app = express();
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:8888/auth/callback',
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];

// req needs destination of where to redirect
exports.login = (req, res) => {
    res.json({ redirect: spotifyApi.createAuthorizeURL(scopes) });
}

exports.callback = async (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
    const decoded = await promisify(jwt.verify)(req.cookies.login, process.env.JWT_SECRET);
    
    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }
    
    spotifyApi
        .authorizationCodeGrant(code)
        .then(data  => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
    
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        db.query("UPDATE user SET accesstoken = ? WHERE userId = ?", [access_token, decoded.id]);
    
        console.log(
            `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );

        setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const access_token = data.body['access_token'];
    
            console.log('The access token has been refreshed!');
            console.log('access_token:', access_token);
            db.query("UPDATE user SET accesstoken = ? WHERE userId = ?", [access_token, req.cookies.login.id]);
            spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
        })
        .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
    });
}

exports.getMe = async (req, res) => {
    await spotifyApi.getMe()
        .then((data) => {
            console.log(data.body);
        })
        .catch((err) => {
            console.log("Error: " + err.message);
        });
}

//GET  PLAYLISTS
exports.getUserPlaylists = async (req, res) => {
    const me = await spotifyApi.getMe();
    const data = await spotifyApi.getUserPlaylists(me.display_name);
    let playlists = []

    for (let playlist of data.body.items) {
        playlists.push(playlist.id);
    }

    console.log(playlists);
}

//module.exports = spotifyApi;