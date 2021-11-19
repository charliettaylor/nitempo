import "./feed.css"
import Post from "../post/Post"
import { useEffect, useState } from 'react';
import Share from "../share/Share"
import axios from "axios";
import React from "react";

export default function Feed({ username }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = username 
                    ? await axios.get("/posts/profile/" + username) //change this later to our new db
                    : await axios.get("/posts") //change this later to our new db
                setPosts(res.data)
            } catch(e) {
                console.error(e.response.data)
            }
        }
        fetchPosts();
    }, [username])

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {posts.map((p) => (
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    )
}
