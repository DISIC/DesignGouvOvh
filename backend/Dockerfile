ARG  IMG_BASE=latest
FROM ghcr.io/disic/designgouvovh/base:${IMG_BASE}

WORKDIR /usr/src/app

COPY server.js package.json ./

USER root

RUN apk add --update nodejs npm && \
    npm install

EXPOSE 8085
CMD [ "npm", "start" ]