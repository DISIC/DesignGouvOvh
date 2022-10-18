FROM ghcr.io/disic/designgouvovh/base:dev

WORKDIR /usr/src/app

COPY server.js package.json ./

RUN apk add --update nodejs npm && \
    npm install

EXPOSE 8085
CMD [ "npm", "start" ]