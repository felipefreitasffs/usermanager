import { decodeJwt } from "jose";
import Cookies from "js-cookie";

const login = function (
  accessToken: string,
  idToken: string | null,
  refreshToken?: string | null,
  state?: string
) {
  const stateCookie = Cookies.get("state");
  if (state && stateCookie !== state) {
    throw new Error("Invalid state");
  }

  let decodedAccessToken = null;
  let decodedIdToken = null;
  let decodedRefreshToken = null;
  try {
    decodedAccessToken = decodeJwt(accessToken);

    if (idToken) {
      decodedIdToken = decodeJwt(idToken);
    }

    if (refreshToken) {
      decodedRefreshToken = decodeJwt(refreshToken);
    }
  } catch (e) {
    console.error(e);
    throw new Error("Invalid token");
  }

  if (decodedAccessToken.nonce !== Cookies.get("nonce")) {
    throw new Error("Invalid nonce");
  }

  if (decodedIdToken && decodedIdToken.nonce !== Cookies.get("nonce")) {
    throw new Error("Invalid nonce");
  }

  if (
    decodedRefreshToken &&
    decodedRefreshToken.nonce !== Cookies.get("nonce")
  ) {
    throw new Error("Invalid nonce");
  }

  Cookies.set("access_token", accessToken);
  if (idToken) {
    Cookies.set("id_token", idToken);
  }
  if (decodedRefreshToken) {
    Cookies.set("refresh_token", refreshToken as string);
  }

  return decodedAccessToken;
}

export default login;