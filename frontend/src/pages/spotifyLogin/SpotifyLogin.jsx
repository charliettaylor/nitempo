import React from 'react';
import { useEffect } from 'react';
import "./SpotifyLogin.css";
import axios from 'axios';
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
axios.defaults.headers.common['authorization'] = 'bearer y38fa8df5ad9402ebe4c131072cf4768';


export default function SpotifyLogin() {
  useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await axios.get("/auth/spotifyLogin")
            console.log(res.data.redirect)
        } catch(e) {
            console.error(e.response.data)
        }
    }
    fetchUser();
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
  }
  
  return (
    <div>
      <form onSubmit={handleClick}>
          <button className="button" type="submit">Log In</button>
      </form>
    </div>
  )
}
