FROM node:22-alpine AS alpine

FROM alpine AS base
RUN npm install turbo --global
RUN corepack enable && corepack prepare yarn@4.8.1

FROM base AS pruner

WORKDIR /app
COPY . .
RUN turbo prune --scope=api --docker

FROM base AS builder

WORKDIR /app

COPY --from=pruner /app/out/yarn.lock ./yarn.lock
COPY --from=pruner /app/out/json/ .

RUN yarn install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
RUN npx prisma generate --schema ./api/prisma/schema.prisma
RUN turbo build --filter=api
RUN yarn workspaces focus --all --production

FROM alpine AS runnner

COPY --from=builder /app /app
WORKDIR /app/api

CMD node dist/main
