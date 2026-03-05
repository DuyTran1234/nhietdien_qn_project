FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["sh", "-c", "cp -r /app/dist/. /web_static/"]