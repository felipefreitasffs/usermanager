import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import Cookies from "js-cookie";

export function Login() {
  const { auth } = useContext(AuthContext);

  const makeLoginUrl = function (): string {
    const nonce = Math.random().toString(36);
    const state = Math.random().toString(36);

    //lembrar armazenar com cookie seguro (https)
    Cookies.set("nonce", nonce);
    Cookies.set("state", state);

    const loginUrlParams = new URLSearchParams({
      client_id: import.meta.env.VITE_KC_CLIENT_ID,
      redirect_uri: `${import.meta.env.VITE_BASE_URL}/callback`,
      response_type: "token id_token code",
      nonce: nonce,
      state: state,
    });

    return `${import.meta.env.VITE_KC_BASE_URL}/auth?${loginUrlParams.toString()}`;
  }

  useEffect(() => {
    if (!auth) {
      window.location.href = makeLoginUrl();
    }
  }, [auth]);

  return auth ? <Navigate to="/" /> : <div>Loading...</div>;
}