FROM ubuntu:22.04

RUN apt-get update && apt-get install g++ build-essential curl -y
RUN curl -s https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install nodejs -y
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

RUN npm test
RUN npx tsc

CMD ["node", "dist/index.js"]