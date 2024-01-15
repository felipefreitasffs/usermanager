import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

export function Callback() {
  const { hash } = useLocation();
  const { login, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/login");
      return;
    }

    const searchParams = new URLSearchParams(hash.replace("#", ""));
    const accessToken = searchParams.get("access_token") as string;
    const idToken = searchParams.get("id_token") as string;
    const state = searchParams.get("state") as string;
    const code = searchParams.get("code") as string;

    console.log('accessToken', accessToken)
    console.log('idToken', idToken)
    console.log('code', code)

    if (!accessToken || !idToken || !state) {
      navigate("/login");
    }

    if (login) {
      login(accessToken, idToken, code, state);
    }

  }, [hash, login, auth, navigate]);

  return <div>Loading...</div>;
}
