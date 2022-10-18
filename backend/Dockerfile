FROM node:alpine

WORKDIR /usr/src/app

COPY server.js package.json ./

RUN npm install

EXPOSE 8085
CMD [ "npm", "start" ]