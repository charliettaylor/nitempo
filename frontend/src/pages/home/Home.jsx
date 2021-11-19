import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import React from "react";

export default function Home() {
    return (
        <React.Fragment>
            <Topbar/>
            <div className="homeContainer">
            <Leftbar/>
            <Feed/>
            <Rightbar/>
            </div>
        </React.Fragment>
    )
}
