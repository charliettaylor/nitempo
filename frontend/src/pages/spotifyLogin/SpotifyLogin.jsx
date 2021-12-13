import React from 'react';
import "./SpotifyLogin.css";
import axios from 'axios';
axios.defaults.headers.common['authorization'] = 'bearer y38fa8df5ad9402ebe4c131072cf4768';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=dace8b06faeb4ce09cde9f32c8f55de9&response_type=code&redirect_uri=https://nitempo.herokuapp.com/auth/callback&scope=ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20streaming%20app-remote-control%20user-read-email%20user-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20playlist-modify-private%20user-library-modify%20user-library-read%20user-top-read%20user-read-playback-position%20user-read-recently-played%20user-follow-read%20user-follow-modify"

export default function SpotifyLogin() {

  return (
    <div>
      <main>
        <section class = "transition">
          <div class="dashboard">
            <div class="user">

            <a href={AUTH_URL}>
            Login with Spotify
            </a>

            </div>
          </div>

        </section>



      </main>
    
    </div>
  )
}
