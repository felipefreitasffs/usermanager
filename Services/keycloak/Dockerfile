FROM node:18 as keycloakify_jar_builder
RUN apt-get update && \
    apt-get install -y default-jdk && \
    apt-get install -y maven;
COPY ./keycloakTheme/package.json ./keycloakTheme/yarn.lock /opt/app/
WORKDIR /opt/app
RUN yarn install --frozen-lockfile
COPY ./keycloakTheme /opt/app/
RUN yarn build-keycloak-theme

FROM quay.io/keycloak/keycloak:latest as builder
WORKDIR /opt/keycloak
COPY --from=keycloakify_jar_builder /opt/app/build_keycloak/target/usermanager-theme-5.1.4.jar /opt/keycloak/providers/
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/
# ENV KC_HOSTNAME=localhost
# ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev"]