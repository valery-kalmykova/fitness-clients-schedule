FROM node:18-alpine AS builder
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm i
COPY .env ./
COPY ./frontend ./
COPY ./frontend/vite.config.ts ./vite.config.ts
RUN npm run build

FROM nginx:latest AS production
COPY --from=builder /app/dist /usr/share/nginx/html/
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
