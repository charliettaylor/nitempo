const SpotifyWebApi = require('spotify-web-api-node');
const db = require('./db');
const express = require('express');
const app = express();
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { create } = require('hbs');

const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
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

        return spotifyApi.getMe();
        })
        .then(data => {
            var accessToken = spotifyApi.getAccessToken();
            var refreshToken = spotifyApi.getRefreshToken();

            if(!userExists(data.body['id'])){
                db.query("UPDATE user SET accessToken = ?, refreshToken = ? WHERE userId = ?", [accessToken, refreshToken, data.body['id']]);
                console.log(data.body['id'] + ' tokens updated');
            } else {
                db.query('INSERT INTO user SET ?',
                { userID: data.body["id"], email: data.body["email"], accessToken: accessToken, refreshToken: refreshToken },
                (error, result) => {
                    if(error){
                        console.log(error);
                    } else {
                        console.log(result);
                    }
            });
            }
        }
        )
        .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
    });
}

function userExists(userID){
    db.query('SELECT * FROM user WHERE userID = ?', [userID],
    (error, result) => {
        if (!result) {
            console.log('no result');
            return true;
        }
        return false;
    });
}

exports.getMe = async (req, res) => {
    spotifyApi.setAccessToken(req.body.accessToken);
    await spotifyApi.getMe()
        .then((data) => {
            console.log(data.body);
            res.send(data);
        })
        .catch((err) => {
            console.log("Error: " + err.message);
        });
}

//GET  PLAYLISTS
exports.getUserPlaylists = async (req, res) => {
    spotifyApi.setAccessToken(req.body.accessToken);
    await spotifyApi.getMe()
    .then(data => {
        spotifyApi.getUserPlaylists(data.body['id'])
        .then(data => {
        let playlists = []

        for (let playlist of data.body.items) {
            playlists.push(playlist.id);
        }

        console.log(playlists);
        res.json({ "playlists" : playlists });
    })
    })
    .catch((error) => {
        console.log(error);
    });
}

//module.exports = spotifyApi;