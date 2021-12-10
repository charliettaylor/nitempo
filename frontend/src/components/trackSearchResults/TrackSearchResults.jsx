import React from 'react'
import "./trackSearchResults.css"

export default function TrackSearchResults({track, chooseTrack}) {
    function handlePlay() {
        chooseTrack(track)
    }
    
    return (
        <div className="track" onClick={handlePlay}>
            <img src={track.albumUrl} style={{height: '64px', width: '64px'}} alt={track.title}/>
            <div>
                <div className="title">{track.title}</div>
                <div className="artist">{track.artist}</div>
            </div>
        </div>
    )
}
