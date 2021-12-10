import React from "react";
import "./leftbar.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import SpotifyWebApi from "spotify-web-api-node"
import {RssFeed,  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,} from "@material-ui/icons"  
import { Users } from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend"

const userId = new URLSearchParams(window.location.search).get('username')

const spotifyApi = new SpotifyWebApi({
  clientId: "dace8b06faeb4ce09cde9f32c8f55de9",
})

export default function Leftbar({user, code}) {
    const [playlist0, setPlaylist0] = useState();
    const [playlist1, setPlaylist1] = useState();
    const [playlist2, setPlaylist2] = useState();
    const [playlist3, setPlaylist3] = useState();
    const [playlist4, setPlaylist4] = useState();
    const [playlist5, setPlaylist5] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        axios.post("https://nitempo.herokuapp.com/spotify/getPlaylists", {
        userID: userId
        })
        .then(res => {
        setPlaylist0(res.data.playlists[0])
        setPlaylist1(res.data.playlists[1])
        setPlaylist2(res.data.playlists[2])
        setPlaylist3(res.data.playlists[3])
        setPlaylist4(res.data.playlists[4])
        setPlaylist5(res.data.playlists[5])

        })
        .catch((e) => {
        console.log(e)
        })
    })

    return (
        <div className="leftbar">
            <div className="leftbarWrapper">
                <iframe src={"https://open.spotify.com/embed/playlist/"+playlist0+"?utm_source=generator"} width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                <iframe src={"https://open.spotify.com/embed/playlist/"+playlist1+"?utm_source=generator"} width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                <iframe src={"https://open.spotify.com/embed/playlist/"+playlist2+"?utm_source=generator"} width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                <iframe src={"https://open.spotify.com/embed/playlist/"+playlist3+"?utm_source=generator"} width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                <iframe src={"https://open.spotify.com/embed/playlist/"+playlist4+"?utm_source=generator"} width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                <iframe src={"https://open.spotify.com/embed/playlist/"+playlist5+"?utm_source=generator"} width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                <hr className="leftbarHr"/>
                <ul className="leftbarFriendList">
                    {Users.map((u) => (
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}
