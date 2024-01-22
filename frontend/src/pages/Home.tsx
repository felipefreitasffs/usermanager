import { useContext, useEffect, useState } from "react";
import api from "../utils/Http";
import { AuthContext } from "../Context/AuthProvider";

export function Home() {
  const { auth } = useContext(AuthContext);
  const [apiResult, setApiResult] = useState('Olá')

  useEffect(() => {
    api.get("/api/user").then((result) => {
      console.log('result', result)
      setApiResult(result.data)
      return
    })
  }, [])

  return(
    <>
      <p>Olá {auth ? auth.name as string : ''}</p>
      <p>{apiResult}...</p>
    </>
  ) 
}