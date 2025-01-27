FROM node:23-alpine3.20 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:23-alpine3.20 AS builder

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma migrate deploy
RUN npx prisma generate

RUN npm run build

RUN npm ci -f --only=production && npm cache clean --force

FROM node:23-alpine3.20 AS runner
WORKDIR /usr/src/app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
USER node
EXPOSE 3000

CMD ["node", "dist/main.js"]