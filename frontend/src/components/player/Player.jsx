import React from 'react'
import { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import "./player.css"

export default function Player({accessToken, trackUri}) {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if (!accessToken) return null
    return (
        <SpotifyPlayer
          styles={{
            activeColor: '#fff',
            altColor: '#fff',
            bgColor: '#669EA3',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#669EA3',
            slideTrackColor: "#fff",
            trackArtistColor: '#fff',
            trackNameColor: '#fff',
        }}
            token={accessToken}
            showSaveIcon
            callback={state => {
                if(!state.isPlaying) setPlay(false)
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}
        />
    )
}
