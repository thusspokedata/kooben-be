FROM node:18-alpine AS dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@10.2.4
RUN npm install
CMD [ "npm", "run", "start:dev" ]

FROM node:18-alpine AS dev-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@10.2.4
RUN npm install

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g npm@10.2.4
RUN npm install --omit=dev

FROM node:18-alpine AS prod
EXPOSE 3000
WORKDIR /app
ENV APP_VERSION=${APP_VERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "node", "dist/main.js" ]