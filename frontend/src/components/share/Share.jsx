import React from "react";
import { useState, useEffect } from 'react'
import "./share.css";
import {Audiotrack, PhotoLibrary, EmojiEmotions} from "@material-ui/icons"
import useAuth from "../../useAuth";
import SpotifyWebApi from "spotify-web-api-node"

const userId = new URLSearchParams(window.location.search).get('username')

const spotifyApi = new SpotifyWebApi({
    clientId: "dace8b06faeb4ce09cde9f32c8f55de9",
})

export default function Share({ user, code }) {
    const accessToken = useAuth(code)
    const [username, setUsername] = useState()
    const [userImage, setUserImage] = useState()
    const [userLink, setUserLink] = useState()

    // Spotify
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        }, [accessToken])

    useEffect(() => {
    if (!accessToken) return
    spotifyApi.getUser(userId).then(res => {
        setUsername(res.body.display_name)
        setUserImage(res.body.images.url)
        setUserLink(res.body.external_urls.spotify)
    })
    }, [accessToken])

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/profiles/1.png" alt="" />
                    <input placeholder={"What's on your mind " + username +"?"} className="shareInput"/>
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <Audiotrack htmlColor="#3D4363" className="shareIcon"/>
                            <span className="shareOptionText">Share Music</span>
                        </div>
                        <div className="shareOption">
                            <PhotoLibrary htmlColor="#3D4363" className="shareIcon"/>
                            <span className="shareOptionText">Pictures</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="#3D4363" className="shareIcon"/>
                            <span className="shareOptionText">Emoji</span>
                        </div>
                    </div>
                    <button className="shareButton">POST</button>
                </div>
            </div>
        </div>
    )
}
