import { useEffect } from "react";
import api from "../utils/Http";

export function Home() {
  useEffect(() => {
    console.log("Home")
    async function name() {
      const result = await api().get("/api/user ")
      console.log(result.data)
    }

    name();
  })

  return <div>Olá...</div>
}