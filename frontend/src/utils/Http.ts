import axios, { AxiosError, AxiosInstance } from "axios";
import Cookies from "js-cookie";
import Login from "./Login";

//Cria um tipo que irá servir de base para as requests falhadas
type FailedRequestQueue = {
  onSuccess: (newToken: string) => void;
  onFailure: () => void;
};

//Cria uma array para salvar essas requests
let failedRequestsQueue: FailedRequestQueue[] = [];
//Cria uma variável que irá determinar se já está
//acontecendo um processo de refresh, para não gerar duplicidade
let isRefreshing = false;

const http = axios.create({
  baseURL: "http://host.docker.internal:9080/",
});

const refreshTokenAPI = function (refreshToken: string) {
  const tokenUrlParams = new URLSearchParams({
    client_id: "react-front",
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    redirect_uri: "http://127.0.0.1:5173/callback",
    nonce: Cookies.get("nonce") as string,
  });

  return fetch(
    "http://localhost:8080/realms/usermanager/protocol/openid-connect/token",
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
    })
    .catch((err) => {
      console.log(err);
    });
};

const api = (): AxiosInstance => {
  if (!Cookies.get("id_token")) {
    throw new Error("Id Token not found");
  }

  http.interceptors.request.use((request) => {
    //Por algum motivo os headers podem vir undefined
    //Para não ter problemas adiciono um valor default
    const headers = request.headers ?? {};
    const token = Cookies.get("access_token");

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    request.headers = headers;
    return request;
  });

  http.interceptors.response.use(
    (response) => {
      return response; //Em caso de sucesso só retorna a resposta
    },
    (error: AxiosError) => {
      //Detecta se foi um erro de autorização

      console.log("error.response", JSON.stringify(error.response));

      if (error.response?.status === 401) {
        const refreshToken = Cookies.get("refresh_token");

        console.log('refreshToken',refreshToken)
        //Uma sugestão aqui é verificar o tipo do erro retornando
        //pois um token pode ser inválido, por exemplo, e nesse caso
        //gerar um novo token usando o refreshtoken pode ser um
        //problema de segurança. Logo o token tem que ser válido
        //porém está expirado.
        //E para fechar com chave de ouro esse ponto,
        //ao fazer o refresh token o backend deverá invalidar o token.

        //Somado a isso verificar se há um refresh token salvo
        // if (error.response.data?.code === "token.expired" && refreshToken) {
        if (refreshToken) {
          //Busca as informações da request. Com elas é possível
          //repetir a request passando as mesmas informações
          // const originalRequest = error.config;

          //Verifica se já está acontecendo um processo
          //de refresh
          if (!isRefreshing) {
            //Seta como true para acontecer só 1 refresh por vez
            isRefreshing = true;

            //Chama a API de refresh token
            refreshTokenAPI(refreshToken)
              .then(({ data }) => {
                //Em caso de sucesso atualiza os tokens nos cookies
                Cookies.set("access_token", data.token);
                Cookies.set("refresh_token", data.refreshToken);

                //Retenta todas requests falhadas com o novo token
                failedRequestsQueue.forEach((request) => {
                  request.onSuccess(data.token);
                });
              })
              .catch((err) => {
                console.error(err);
                //Em caso de falha, podemos tomar diferentes
                //estratégias dependendo do contexto.

                //Tenho duas sugestões para esse cenário:

                //A. O famoso "Sai do fusca, entra no fusca".
                //Limpo os tokens e mando o usuário para o login
                Cookies.remove("access_token");
                Cookies.remove("id_token");
                Cookies.remove("refresh_token");
                Cookies.remove("nonce");
                Cookies.remove("state");
                window.location.href = "/login";

                //B. Retorno o erro nas requests e cada uma faz um
                //tratamento próprio, como mostra um pop-up, enviar para
                //uma página de erro etc.
                failedRequestsQueue.forEach((request) => {
                  request.onFailure();
                });
              })
              .finally(() => {
                //Limpo a fila de requests falhadas
                failedRequestsQueue = [];
                //Informo que o processo de refreshing já terminou, para caso
                //ocorra outro erro de token expirado na mesma sessão
                isRefreshing = false;
              });
          }

          // //Retorna uma promise que vai aguardar o processo de
          // //refresh token ser realizado.
          // return new Promise((resolve, reject) => {
          //   //Adiciona na lista de requests falhadas a request atual
          //   failedRequestsQueue.push({
          //     onSuccess: (newToken: string) => {
          //       //Em caso de sucesso será recebido o novo token
          //       //Basta substituir ele na request e tentar novamente
          //       originalRequest?.headers![
          //         "Authorization"
          //       ] = `Bearer ${newToken}`;

          //       resolve(api(originalRequest));
          //     },
          //     onFailure: () => {
          //       //Em caso de erro, repassa o erro original
          //       //para que seja feito um tratamento específico
          //       //de acordo com o contexto da chamada.
          //       reject(error);
          //     },
          //   });
          // });
        } else {
          //Em caso de erro 401 que não seja token expirado
          //ou não haja refresh token.
          //Limpa os tokens e manda para a rota de login
          Cookies.remove("access_token");
          Cookies.remove("id_token");
          Cookies.remove("refresh_token");
          Cookies.remove("nonce");
          Cookies.remove("state");
          window.location.href = "/login";
        }
      }
      //Caso o tipo do erro seja outro, retorna ele normalmente
      return Promise.reject(error);
    }
  );

  return http;
};

export default api;
