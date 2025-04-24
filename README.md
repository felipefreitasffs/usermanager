# POC Keycloak + APISix - User Manager

Este projeto é uma Prova de Conceito (POC) criada para explorar e testar a integração entre o **Keycloak** como servidor de identidade e autorização (Identity and Access Management - IAM) e o **Apache APISix** como API Gateway, validando tokens e protegendo microserviços backend.

O cenário inclui:
* Um frontend em React + Vite para interação do usuário.
* Dois microserviços backend desenvolvidos em NestJS (um para gerenciar usuários, outro para clientes).
* Keycloak para gerenciar autenticação e autorização (usando OpenID Connect/OAuth2).
* APISix configurado para interceptar requisições, validar tokens JWT com o Keycloak e rotear para os serviços corretos.
* Infraestrutura de suporte (Banco de Dados MySQL para Keycloak, etcd para APISix) e monitoramento (Prometheus, Grafana) rodando via Docker Compose.

## Tecnologias Utilizadas

* **IAM:** Keycloak
* **API Gateway:** Apache APISix
* **Backend:** NestJS (Node.js, TypeScript)
* **Frontend:** React, Vite
* **Banco de Dados (Keycloak):** MySQL
* **Infraestrutura:** Docker, Docker Compose
* **Service Discovery/Config (APISix):** etcd
* **Monitoramento:** Prometheus, Grafana

## Pré-requisitos

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)
## Como Rodar o Projeto

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/felipefreitasffs/usermanager.git
    cd usermanager
    ```

2.  **Configuração Inicial:**
    * Verifique se os arquivos de configuração em `./keycloak/`, `./apisix_conf/`, `./dashboard_conf/`, `./prometheus_conf/`, `./grafana_conf/` estão corretos para seu ambiente, se necessário.
    * O Keycloak está configurado para importar automaticamente um realm definido no volume `./keycloak:/opt/keycloak/data/import`. Certifique-se de que o arquivo de exportação do realm esteja neste diretório local antes de iniciar.

3.  **Inicie os Serviços:**
    No diretório raiz do projeto (onde está o `docker-compose.yml` principal), execute:
    ```bash
    docker-compose -f Docker/docker-compose-services.yml up -d
    ```
    Aguarde alguns instantes para que todos os contêineres iniciem e estejam saudáveis (especialmente o `db` para o `keycloak`).

## Acessando os Serviços

Após iniciar os contêineres, os serviços estarão disponíveis nos seguintes endereços (portas padrão):

* **Keycloak Admin Console:** [`http://localhost:8080`](http://localhost:8080)
    * *Credenciais Admin Padrão:* `admin` / `admin` (definido no `docker-compose.yml`)
* **APISix Dashboard:** [`http://localhost:9000`](http://localhost:9000)
* **APISix Gateway:** [`http://localhost:9080`](http://localhost:9080) (porta principal para APIs)
* **Frontend App:** [`http://localhost:3030`](http://localhost:[PORTA_DO_FRONTEND])
* **Grafana:** [`http://localhost:3000`](http://localhost:3000)
* **Prometheus:** [`http://localhost:9090`](http://localhost:9090)

## Como Testar a Integração (Exemplo)

O fluxo esperado é que o Frontend obtenha um token JWT do Keycloak e o envie nas requisições para as APIs via APISix. O APISix valida o token com o Keycloak antes de encaminhar para os microserviços NestJS.

1.  **Obtenha um Token:**
    * Acesse o Keycloak (`http://localhost:8080`).
    * Faça login no realm importado com um usuário de teste.
    * Utilize o fluxo OAuth2/OpenID Connect apropriado (ex: Authorization Code Flow ou Password Grant - dependendo da configuração do cliente Keycloak) para obter um Access Token JWT. Ferramentas como Postman ou a própria interface do Keycloak podem ajudar aqui.

2.  **Faça uma Requisição via APISix:**
    * Use uma ferramenta como `curl` ou Postman para fazer uma requisição a um endpoint protegido que passa pelo APISix, incluindo o token obtido no cabeçalho `Authorization`
    * Verifique se a requisição é bem-sucedida (status 2xx) com um token válido e falha (status 401/403) sem um token ou com um token inválido.

3.  **Teste via Frontend (Opcional):**
    * Acesse a aplicação frontend (`http://localhost:3030`).
    * Tente fazer login usando o fluxo configurado com o Keycloak.
    * Tente acessar recursos/páginas que dependam de chamadas às APIs protegidas.

## Estrutura do Projeto
```
├── Docker/
│   └── docker-compose-services.yml # Arquivo principal do docker-compose
├── Services/
│   ├── keycloak/
│   │   ├── Dockerfile             # Dockerfile do Keycloak (se customizado)
│   │   └── keycloak/              # Diretório montado como volume para import
│   │       └── [NOME_DO_REALM]-realm.json # Export do Realm a ser importado
│   ├── backend-user-service/     # Microserviço NestJS para usuários 
│   ├── backend-client-service/   # Microserviço NestJS para clientes 
│   └── frontend-react/           # Aplicação Frontend React+Vite 
├── apisix_conf/
│   └── config.yaml               # Configuração do APISix
├── dashboard_conf/
│   └── conf.yaml                 # Configuração do APISix Dashboard
├── prometheus_conf/
│   └── prometheus.yml            # Configuração do Prometheus
├── grafana_conf/                 # Configurações e dashboards do Grafana
│   ├── ...
└── README.md                    # Este arquivo
```
