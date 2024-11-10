FROM node:lts as base

ENV NODE_ENV production

FROM base as deps

WORKDIR /app

ADD package.json ./

RUN npm install --include=dev

FROM base as production-deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

ADD package.json ./

RUN npm prune --omit=dev

FROM base as build

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

ADD . .

RUN npm run build

FROM base

ENV PORT="8080"
ENV NODE_ENV="production"

WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules

COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json

ENTRYPOINT [ "npm", "run", "start" ]
