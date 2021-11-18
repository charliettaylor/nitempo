import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"
import { useRoutes } from "react-router";

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const HomeRightbar = () => {
        return(
            <>
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
            </>
        )
    }

    const ProfileRightBar = () => {
        return (
            <>
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img src={`${PF}profiles/17.png`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Saratha</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src={`${PF}profiles/18.png`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">TP</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src={`${PF}profiles/19.png`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Tanaka</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src={`${PF}profiles/20.png`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Asger</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src={`${PF}profiles/16.png`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Neepit</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src={`${PF}profiles/15.png`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Dior</span>
                    </div>
                </div>
            </>
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
