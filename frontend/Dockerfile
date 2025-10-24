# Dockerfile for React frontend
FROM node:18-alpine

WORKDIR /app

COPY frontend/package.json ./
COPY frontend/package-lock.json ./

RUN npm install

COPY frontend/ ./

CMD ["npm", "start"]
