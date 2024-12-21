FROM node:22-alpine as base

FROM base as builder

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN npm install
RUN npm run build

FROM base as runtime

ENV NODE_ENV=production

WORKDIR /home/node/app
COPY package*.json  ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/server.js"]
