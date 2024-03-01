# FROM node:16 AS production
# WORKDIR /app
# COPY ./package*.json ./
# RUN npm install
# COPY ./dist ./dist/
# EXPOSE 8081
# CMD [ "npm", "run", "start:prod" ]

FROM node:18 AS builder
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:18 AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/ecosystem.config.js ./
RUN npm i --omit=dev && npm i pm2 -g
COPY --from=builder /app/dist ./dist/
EXPOSE 8081
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]