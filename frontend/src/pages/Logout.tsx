import { useEffect } from "react";
import Cookies from "js-cookie";
import { clearCookies } from "../utils/Auth";

export function Logout() {

  const makeLogoutUrl = function (): string | null {
    if (!Cookies.get("id_token")) {
      return '';
    }

    const logoutParams = new URLSearchParams({
      client_id: import.meta.env.VITE_KC_CLIENT_ID,
      id_token_hint: Cookies.get("id_token") as string,
      post_logout_redirect_uri: `${import.meta.env.BASE_URL}/login`,
    });

    clearCookies();

    return `${import.meta.env.VITE_KC_BASE_URL}/logout?${logoutParams.toString()}`;
  }


  useEffect(() => {
    const logoutUrl = makeLogoutUrl();
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  }, []);

  return <div>Loading...</div>;
}