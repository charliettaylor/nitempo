import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import React from "react";

const code = new URLSearchParams(window.location.search).get('code')


export default function Home() {
    return (
        <React.Fragment>
            <Topbar/>
            <div className="homeContainer">
            <Leftbar/>
            <Feed/>
            <Rightbar/>
            </div>
            This is your spotify code: {code}
        </React.Fragment>
    )
}
