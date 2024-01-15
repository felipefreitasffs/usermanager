import { PropsWithChildren, createContext, useCallback, useState } from "react";
import { JWTPayload, decodeJwt } from "jose";
import Cookies from "js-cookie";
import Login from '../utils/Login';

type AuthContextProps = {
  auth: JWTPayload | null;
  login: ((
    accessToken: string,
    idToken: string,
    code: string,
    state: string
  ) => JWTPayload) | null;
};

const exchangeCodeForToken = function (code: string) {
  const tokenUrlParams = new URLSearchParams({
    client_id: "react-front",
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://127.0.0.1:5173/callback",
    nonce: Cookies.get("nonce") as string,
  });

  return fetch(
    "http://host.docker.internal:8080/realms/usermanager/protocol/openid-connect/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenUrlParams.toString(),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return Login(res.access_token, null, res.refresh_token);
    }).catch((err) => { console.log(err) });
}

const getAuth = function () {
  const token = Cookies.get("access_token");

  if (!token) {
    return null;
  }

  try {
    return decodeJwt(token);
  } catch (e) {
    console.error(e);
    return null;
  }
}

const initContextData: AuthContextProps = {
  auth: null,
  login: null,
};

//create a context for the login state
export const AuthContext = createContext(initContextData);

//create a provider for the login state
export const AuthProvider = (props: PropsWithChildren) => {
  const makeLogin = useCallback(
    (accessToken: string, idToken: string, code: string, state: string) => {
      const authData = Login(accessToken, idToken, null, state);

      setData((oldData) => ({
        auth: authData,
        login: oldData.login,
      }));

      exchangeCodeForToken(code).then((authData) => {
        setData((oldData) => ({
          auth: authData,
          login: oldData.login,
        }));
      });

      return authData;
    },
    []
  );

  const [data, setData] = useState({
    auth: getAuth(),
    login: makeLogin,
  });

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
};