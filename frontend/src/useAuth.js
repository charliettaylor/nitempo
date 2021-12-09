import { useState, useEffect } from "react"
import axios from "axios"
axios.defaults.headers.common['authorization'] = 'bearer y38fa8df5ad9402ebe4c131072cf4768';

const userId = new URLSearchParams(window.location.search).get('username')

export default function useAuth(code) {

  useEffect(() => {
    axios
      .post("https://nitempo.herokuapp.com/auth/getUserById", {
        userID: userId
      })
      .then(res => {
        console.log(res)
      })
      .catch(() => {
        console.log("oops")
      })
  }, [code])
}