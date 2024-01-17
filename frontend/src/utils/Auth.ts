import { JWTPayload, decodeJwt } from "jose";
import Cookies from "js-cookie";

export const decodeJWTAndSetCookie = function (
  accessToken: string,
  idToken: string | null,
  refreshToken?: string | null,
  state?: string
): JWTPayload {
  const stateCookie = Cookies.get("state");
  if (state && stateCookie !== state) {
    throw new Error("Invalid state");
  }

  let decodedAccessToken: JWTPayload | null = null;
  let decodedIdToken: JWTPayload | null = null;
  let decodedRefreshToken: JWTPayload | null = null;

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

  if (decodedAccessToken && decodedAccessToken.exp) {
    Cookies.set("access_token", accessToken);
    Cookies.set("access_token_exp", decodedAccessToken.exp.toString());
  }

  if (idToken) {
    Cookies.set("id_token", idToken);
  }

  if (decodedRefreshToken) {
    Cookies.set("refresh_token", refreshToken as string);
  }

  return decodedAccessToken;
};

export const clearCookies = function () {
  Cookies.remove("access_token");
  Cookies.remove("id_token");
  Cookies.remove("refresh_token");
  Cookies.remove("nonce");
  Cookies.remove("state");
};
