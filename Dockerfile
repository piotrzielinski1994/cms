FROM node:22-alpine as base

FROM base as builder

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN npm ci
RUN npm run build

FROM base as runtime

ENV NODE_ENV=production

WORKDIR /home/node/app
COPY package*.json  ./

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/server.js"]
