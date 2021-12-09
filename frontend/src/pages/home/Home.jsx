import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import React from "react";

const code = new URLSearchParams(window.location.search).get('code')
console.log({code})

export default function Home() {
    return (
        <>
            <Topbar code={code}/>
            <div className="homeContainer">
            <Leftbar/>
            <Feed/>
            <Rightbar/>
            </div>
            This is code your spotify code: {code}
        </>
    )
}