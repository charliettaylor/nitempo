import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import React from "react";

export default function Home({code, userId}) {
    return (
        <React.Fragment>
            <Topbar code={code, userId}/>
            <div className="homeContainer">
            <Leftbar code={code, userId}/>
            <Feed code={code, userId}/>
            <Rightbar code={code, userId}/>
            </div>
        </React.Fragment>
    )
}