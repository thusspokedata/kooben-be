<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker-Postgres

```bash
# docker
$ docker-compose up -d

```

## variables de entorno
```bash
npm i @nestjs/config
```
### luego en app.module.ts
```js
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
@Module({
 imports: [ConfigModule.forRoot()],
})
export class AppModule {} 
```


[techniques/database](https://docs.nestjs.com/techniques/database)
```bash
npm install --save @nestjs/typeorm typeorm pg
```

### execute seed 
```
http://127.0.0.1:3000/api/seed
```





## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


https://docs.nestjs.com/techniques/file-upload


npm install @clerk/clerk-sdk-node cookie-parser