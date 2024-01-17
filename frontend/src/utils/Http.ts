import axios from "axios";
import Cookies from "js-cookie";
import { decodeJWTAndSetCookie, clearCookies } from "./Auth";

// Cria um tipo para armazenar as requests que falharam
type FailedRequestQueue = {
  onSuccess: (newToken: string) => void;
  onFailure: (err: string) => void;
};

// Cria uma array para salvar essas requests
let failedRequestsQueue: FailedRequestQueue[] = [];
// Cria uma variável que irá determinar se já está acontecendo um processo de refresh, para não gerar duplicidade
let isRefreshing = false;

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

const refreshTokenAPI = function (refreshToken: string) {
  const tokenUrlParams = new URLSearchParams({
    client_id: import.meta.env.VITE_KC_CLIENT_ID,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  return fetch(`${import.meta.env.VITE_KC_BASE_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: tokenUrlParams.toString(),
  })
    .then((res) => res.json())
    .then((res) => {
      // Em caso de sucesso atualizar os tokens nos cookies
      return decodeJWTAndSetCookie(res.access_token, null, res.refresh_token);
    })
    .catch((err) => {
      console.error(err);
      throw new Error("Refresh Token API Error");
    });
};

http.interceptors.request.use((request) => {
  const headers = request.headers ?? {};
  const access_token = Cookies.get("access_token");
  const access_token_exp = Cookies.get("access_token_exp");

  if (!access_token) {
    console.error("Access Token not found");
    // Limpar os tokens e mando o usuário para o login
    clearCookies();
    window.location.href = "/login";
    return request;
  }

  if (!access_token_exp) {
    console.error("Expiration Date of the Access Token not found");
    // Limpar os tokens e mando o usuário para o login
    clearCookies();
    window.location.href = "/login";
    return request;
  }

  // Calcula a diferença de tempo da data de expiração com a atual
  const timeDiff = Math.round(
    (new Date(parseInt(access_token_exp) * 1000).getTime() - // data de expiração do token menos
      new Date().getTime()) / // data de agora
      60000 // converte para minutos
  );

  // se a difereça é menor que zero então a data de expiração é maior que a data atual
  // ou seja, o access token expirou
  if (timeDiff < 0) {
    const refreshToken = Cookies.get("refresh_token");

    if (!refreshToken) {
      console.error("Refresh Token not found");
      // Limpar os tokens e mando o usuário para o login
      clearCookies();
      window.location.href = "/login";
      return request;
    }

    //Verifica se não está acontecendo um processo de refresh
    if (!isRefreshing) {
      isRefreshing = true;

      //Chama a API de refresh token
      refreshTokenAPI(refreshToken)
        .then(() => {
          // Pega o novo access_token
          const newAccessToken = Cookies.get("access_token") as string;

          //Retenta todas requests falhadas com o novo token
          failedRequestsQueue.forEach((request) => {
            request.onSuccess(newAccessToken);
          });
        })
        .catch((err) => {
          console.error(err);

          // Retornar o erro nas requests
          failedRequestsQueue.forEach((request) => {
            request.onFailure(err);
          });

          // Limpar os tokens e mando o usuário para o login
          clearCookies();
          window.location.href = "/login";
        })
        .finally(() => {
          //Limpo a fila de requests falhadas
          failedRequestsQueue = [];
          //Informo que o processo de refreshing já terminou, para caso
          //ocorra outro erro de token expirado na mesma sessão
          isRefreshing = false;
        });
    }

    // Retorna uma promise que vai aguardar o processo de refresh token ser realizado.
    return new Promise((resolve, reject) => {
      failedRequestsQueue.push({
        onSuccess: (newToken: string) => {
          if (request) {
            request.headers!["Authorization"] = `Bearer ${newToken}`;
            resolve(request);
          }
        },
        onFailure: (error) => {
          reject(error);
        },
      });
    });
  }

  headers["Authorization"] = `Bearer ${access_token}`;
  request.headers = headers;

  return request;
});

export default http;
