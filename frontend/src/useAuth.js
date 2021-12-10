import { useState, useEffect } from "react"
import axios from "axios"
axios.defaults.headers.common['authorization'] = 'bearer y38fa8df5ad9402ebe4c131072cf4768';

const userId = new URLSearchParams(window.location.search).get('username')

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios
      .post("https://nitempo.herokuapp.com/auth/getUserById", {
        userID: userId
      })
      .then(res => {
        // console.log(res)
        setAccessToken(res.data.result.accessToken)
        setRefreshToken(res.data.result.refreshToken)
        setExpiresIn(res.data.result.expiresIn)

      })
      .catch(() => {
        console.log("oops")
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post("https://nitempo.herokuapp.com/spotify/refreshTokens", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.result.expiresIn)
          console.log("Token refreshed!")
        })
        .catch(() => {
          window.location = "/spotifylogin"
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}