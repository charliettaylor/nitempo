import { useState, useEffect } from "react"
import axios from "axios"

export default function useAuth(code) {

  useEffect(() => {
    axios
      .get("getUserById", {
        code,
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(() => {
        console.log("oops")
      })
  }, [code])
}