import React from "react";
import "./share.css";
import {Audiotrack, PhotoLibrary, EmojiEmotions} from "@material-ui/icons"

export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/profiles/1.png" alt="" />
                    <input placeholder="What's on your mind?" className="shareInput"/>
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
