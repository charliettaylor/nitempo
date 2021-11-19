import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"
import { useRoutes } from "react-router";
import React from "react";

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const HomeRightbar = () => {
        return(
            <React.Fragment>
                <div className="audioContainer">
                    <img className="audioImg" src="assets/audio.png" alt="" />
                    <span className="audioText"><b>Trillium</b> and <b>3 other friends</b> are listening to music</span>
                </div>
                <img className="rightbarAd" src="assets/ad.jpg" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
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
