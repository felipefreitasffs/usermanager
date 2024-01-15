import { useEffect } from "react";
import Cookies from "js-cookie";

export function Logout() {

  const makeLogoutUrl = function (): string | null {
    if (!Cookies.get("id_token")) {
      return '';
    }

    const logoutParams = new URLSearchParams({
      //client_id: "fullcycle-client",
      id_token_hint: Cookies.get("id_token") as string,
      post_logout_redirect_uri: "http://localhost:3000/login",
    });

    Cookies.remove("access_token");
    Cookies.remove("id_token");
    Cookies.remove("refresh_token");
    Cookies.remove("nonce");
    Cookies.remove("state");

    return `http://host.docker.internal:8080/realms/usermanager/protocol/openid-connect/logout?${logoutParams.toString()}`;
  }


  useEffect(() => {
    const logoutUrl = makeLogoutUrl();
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  }, []);

  return <div>Loading...</div>;
}