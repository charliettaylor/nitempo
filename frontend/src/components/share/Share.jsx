import React from "react";
import { useState, useEffect, useRef } from 'react'
import "./share.css";
import {Audiotrack, PhotoLibrary, EmojiEmotions} from "@material-ui/icons"
import useAuth from "../../useAuth";
import axios from "axios"
import SpotifyWebApi from "spotify-web-api-node"

const userId = new URLSearchParams(window.location.search).get('username')

const spotifyApi = new SpotifyWebApi({
    clientId: "dace8b06faeb4ce09cde9f32c8f55de9",
})

export default function Share({ user, code }) {
    const message = useRef();
    const [file, setFile] = useState(null);
  
    const submitHandler = async (e) => {
      e.preventDefault();
      const newPost = {
        userID: userId,
        message: message.current.value,
      };
      try {
        await axios.post("https://nitempo.herokuapp.com/post/create", newPost);
        window.location.reload();
      } catch (err) {
          console.log(err)
          console.log("User: " + userId)
          console.log("Post Message: " + message.current.value)
      }
    };

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
                    <input placeholder={"What's on your mind " + username +"?"} className="shareInput" ref={message}/>
                </div>
                <hr className="shareHr"/>
                <form className="shareBottom" onSubmit={submitHandler}>
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
                </form>
            </div>
        </div>
    )
}
