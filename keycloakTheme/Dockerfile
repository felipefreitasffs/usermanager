# build environment
FROM node:18 as keycloakify_jar_builder
RUN apt-get update && \
    apt-get install -y default-jdk && \
    apt-get install -y maven;
WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile
# COPY . .
# RUN yarn build

CMD [ "tail", "-f", "/dev/null" ]

# production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
# CMD nginx -g 'daemon off;'