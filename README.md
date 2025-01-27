<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Make migrations
```bash
$ npx prisma migrate dev --name init

$ npx prisma generate
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Create docker image
```bash
docker build --build-arg DATABASE_URL=<url> -t songs-app .
```

## Create container with image
```bash
docker run -dp 4000:4000 -e PORT=4000 -e DATABASE_URL=<url> songs-app
```