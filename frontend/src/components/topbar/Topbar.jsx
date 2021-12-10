import "./topbar.css"
import { Album, GitHub } from "@material-ui/icons"
import { Link } from "react-router-dom"
import React from "react";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node"
import useAuth from "../../useAuth";

const userId = new URLSearchParams(window.location.search).get('username')

const spotifyApi = new SpotifyWebApi({
  clientId: "dace8b06faeb4ce09cde9f32c8f55de9",
})

export default function Topbar({user, code}) {
  const accessToken = useAuth(code)
  const [username, setUsername] = useState()
  const [userImage, setUserImage] = useState()
  const [userLink, setUserLink] = useState()

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.getUser(userId).then(res => {
      console.log(res)
      setUsername(res.body.display_name)
      setUserImage(res.body.images[0].url)
      setUserLink(res.body.external_urls.spotify)
    })
  }, [accessToken])

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Nitempo</span>
                </Link>
            </div>
            <div className="topbarCenter">
            </div> 
            <div className="topbarRight">
                <div className="topbarLinks">
                  Hello, {username}
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItemAlbum">
                    <a href="https://www.spotify.com/us/" target="_blank">
                    <Album/>
                    </a>
                    </div>
                    <div className="topbarIconItem">
                    <a href="https://github.com/Peekoe/nitempo" target="_blank">
                      <GitHub/>
                    </a>
                    </div>
                </div>
                <a href={userLink} target="_blank">
                  <img src={userImage} alt="" className="topbarImage" />
                </a>
            </div>  
        </div>
    )
}
