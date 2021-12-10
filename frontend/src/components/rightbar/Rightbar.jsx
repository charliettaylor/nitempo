import "./rightbar.css"
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Search } from "@material-ui/icons";
import useAuth from "../../useAuth";
import React from "react";
import SpotifyWebApi from "spotify-web-api-node"
import TrackSearchResult from "../trackSearchResults/TrackSearchResults"
import Player from "../../components/player/Player"

const spotifyApi = new SpotifyWebApi({
    clientId: "dace8b06faeb4ce09cde9f32c8f55de9",
  })

export default function Rightbar({ user, code }) {

    const HomeRightbar = () => {
        const accessToken = useAuth(code)
        const[search, setSearch] = useState("")
        const[searchResults, setSearchResults] = useState([])
        const [playingTrack, setPlayingTrack] = useState()

        function chooseTrack(track) {
            setPlayingTrack(track)
            setSearch("")
          }

        // useEffect(() => {
        //     axios.get("http://www.secondhandgoodies.com/posts/1")
        //     .then(res => {
        //     console.log(res)
        //     })
        //     .catch((e) => {
        //     console.log(e)
        //     })
        // })

        useEffect(() => {
            if (!accessToken) return
            spotifyApi.setAccessToken(accessToken)
          }, [accessToken])
        
        useEffect(() => {
            if (!search) return setSearchResults([])
            if (!accessToken) return
        
            let cancel = false
            spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                    },
                    track.album.images[0]
                )
                    
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url,
                }
                })
            )
            })
        
            return () => (cancel = true)
        }, [search, accessToken])        

        return(
            <React.Fragment>
                <div className="audioContainer">
                    <img className="audioImg" src="assets/audio.png" alt="" />
                    <span className="audioText"><h3>Discover new music!</h3></span>
                </div>
                <img className="rightbarAd" src="assets/ad.jpg" alt="" />
                <h4 className="rightbarTitle">Search for music</h4>
                <div className="searchContainer">
                    <div className="searchbar">
                    <Search className="searchIcon" />
                        <Form.Control
                            type="search"
                            placeholder="Search songs/artist"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="searchInput"
                        />
                    </div>
                    <div>
                            {searchResults.map(track => (
                            <TrackSearchResult
                                track={track}
                                key={track.uri}
                                chooseTrack={chooseTrack}
                            />
                            ))}
                    </div>
                    <div className="playerContainer">
                        <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    const ProfileRightBar = () => {
        return (
            <React.Fragment>
                <div class="links down_box">
                    <div class="link">
                    <img src="./images/home.png" alt="" />
                    <h2>HOME</h2>
                    </div>

                    <div class="link">
                    <img src="./images/rating.png" alt="" />
                    <h2>PROFILE</h2>
                    </div>
                    <div class="link">
                    <img src="./images/settings.png" alt="" />
                    <h2>SETTINGS</h2>
                    </div>
                    <div class="link">
                    <img src="./images/logout.png" alt="" />
                    <h2>LOG OUT</h2>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar/> : <HomeRightbar/>}
            </div>
        </div>
    )
}
