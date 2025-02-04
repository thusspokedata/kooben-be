FROM node:22-alpine AS dev
WORKDIR /app
COPY package.json ./
RUN npm install -g npm@11 # Upgrades npm to version 11
RUN npm ci
CMD [ "npm", "run", "start:dev" ]

FROM node:22-alpine AS dev-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@11
RUN npm ci  # Ensures exact dependency versions based on package-lock.json

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@11
RUN npm ci --omit=dev  # Installs only production dependencies

FROM node:22-alpine AS prod
EXPOSE 3000
WORKDIR /app
ENV APP_VERSION=${APP_VERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "node", "dist/main.js" ]  # Starts the NestJS application