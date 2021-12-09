import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import React from "react";
import useAuth from "../../useAuth"

const code = new URLSearchParams(window.location.search).get('code')
console.log({code})

export default function Home({code}) {
    const accessToken = useAuth(code)
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