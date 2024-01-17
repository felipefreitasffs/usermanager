import { useEffect, useState } from "react";
import api from "../utils/Http";

export function Home() {
  const [apiResult, setApiResult] = useState('Olá')

  useEffect(() => {
    api.get("/api/user").then((result) => {
      console.log('result', result)
      setApiResult(result.data)
      return
    })
    api.get("/api/user")
    api.get("/api/user")
    api.get("/api/user")
    api.get("/api/user")
    api.get("/api/user")
    api.get("/api/user")
  }, [])

  return <div>{apiResult}...</div>
}