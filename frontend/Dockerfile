FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
# Lệnh này để giữ container sống nếu ông vẫn muốn dùng volume mount sang Nginx
CMD ["sleep", "infinity"]