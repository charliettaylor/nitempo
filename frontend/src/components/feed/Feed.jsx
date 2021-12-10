import "./feed.css"
import Post from "../post/Post"
import { useEffect, useState } from 'react';
import Share from "../share/Share"
import axios from "axios";
import React from "react";
axios.defaults.headers.common['authorization'] = 'bearer y38fa8df5ad9402ebe4c131072cf4768';

const userId = new URLSearchParams(window.location.search).get('username')

export default function Feed({ username, code }) {
    const [posts, setPosts] = useState([])
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
  
    useEffect(() => {
      axios
        .post("https://nitempo.herokuapp.com/auth/getUserById", {
          userID: userId
        })
        .then(res => {
          setAccessToken(res.data.result.accessToken)
          setRefreshToken(res.data.result.refreshToken)
          setExpiresIn(res.data.result.expiresIn)
  
        })
        .catch(() => {
          console.log("oops")
        })
    }, [code])
    
    useEffect(() => {
        axios.post("https://nitempo.herokuapp.com/post/feed", {
        userID: userId
        })
        .then(res => {
        console.log(res)
        })
        .catch((e) => {
        console.log(e)
        })
    })

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share code={username, code}/>
                {posts.map((p) => (
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    )
}
